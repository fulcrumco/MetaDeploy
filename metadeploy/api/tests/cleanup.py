from datetime import timedelta

from django.utils import timezone
import pytest

from ..cleanup import (
    cleanup_user_data,
    clear_old_exceptions,
    delete_old_users,
    expire_oauth_accounts,
    fix_dead_jobs_status,
)
from ..models import User


@pytest.mark.django_db
def test_expire_oauth_accounts(user_factory):
    user1 = user_factory()
    user1.socialaccount_set.update(last_login=timezone.now())
    user2 = user_factory()
    user2.socialaccount_set.update(last_login=timezone.now() - timedelta(minutes=30))

    cleanup_user_data()

    user1.refresh_from_db()
    user2.refresh_from_db()

    assert user1.valid_token_for == "00Dxxxxxxxxxxxxxxx"
    assert user2.valid_token_for is None


@pytest.mark.django_db
def test_expire_oauth_accounts_with_started_job(job_factory):
    job = job_factory(org_id="00Dxxxxxxxxxxxxxxx")
    job.user.socialaccount_set.update(last_login=timezone.now() - timedelta(minutes=30))

    expire_oauth_accounts()

    assert job.user.valid_token_for is not None


@pytest.mark.django_db
def test_delete_old_users(user_factory):
    two_months_ago = timezone.now() - timedelta(days=60)
    new_user = user_factory()
    old_user = user_factory(last_login=two_months_ago)
    staff_user = user_factory(last_login=two_months_ago, is_staff=True)

    delete_old_users()

    # make sure only the old user was deleted
    new_user.refresh_from_db()
    staff_user.refresh_from_db()
    with pytest.raises(User.DoesNotExist):
        old_user.refresh_from_db()


@pytest.mark.django_db
def test_clear_old_exceptions(job_factory):
    half_year_ago = timezone.now() - timedelta(days=180)
    old_job = job_factory(exception="Danger!")
    old_job.created_at = half_year_ago
    old_job.save()
    new_job = job_factory(exception="Danger!")

    clear_old_exceptions()

    old_job.refresh_from_db()
    assert old_job.exception is None
    new_job.refresh_from_db()
    assert new_job.exception == "Danger!"


@pytest.mark.django_db
def test_fix_dead_jobs_status(job_factory):
    two_hours_ago = timezone.now() - timedelta(hours=2)
    old_job = job_factory(status="started")
    old_job.enqueued_at = two_hours_ago
    old_job.save()

    fix_dead_jobs_status()

    old_job.refresh_from_db()
    assert old_job.status == "canceled"
