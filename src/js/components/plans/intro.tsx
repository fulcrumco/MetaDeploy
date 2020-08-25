import Button from '@salesforce/design-system-react/components/button';
import Tooltip from '@salesforce/design-system-react/components/tooltip';
import i18n from 'i18next';
import React, { useState } from 'react';

import SpinOrgModal from '@/components/plans/spinOrgModal';
import { getDuration } from '@/utils/dates';

const Intro = ({
  averageDuration,
  isProductionOrg,
  results,
  cta,
  clickThroughAgreement,
  preMessage,
  postMessage,
  backLink,
  createOrg,
}: {
  averageDuration: string | null;
  isProductionOrg: boolean;
  results: React.ReactNode;
  cta: React.ReactNode;
  clickThroughAgreement?: string | null;
  preMessage?: React.ReactNode;
  postMessage?: React.ReactNode;
  backLink?: React.ReactNode;
  createOrg?: (email: string) => void;
}) => {
  const [
    createOrgAgreementModalOpen,
    setcreateOrgAgreementModalOpen,
  ] = useState(false);
  const duration = getDuration(averageDuration);

  const closeAgreementModal = () => {
    setcreateOrgAgreementModalOpen(false);
  };
  return (
    <div
      className="slds-p-around_medium
        slds-size_1-of-1
        slds-medium-size_1-of-2"
    >
      <div className="slds-text-longform">
        {duration ? (
          <div className="slds-m-bottom_small">
            <strong>{i18n.t('Average Install Time:')}</strong> {duration}.
            {isProductionOrg ? (
              <Tooltip
                content={i18n.t(
                  'Install times in production orgs will vary depending on how many tests need to be run.',
                )}
                assistiveText={{ triggerLearnMoreIcon: 'Disclaimer' }}
                position="overflowBoundaryElement"
                triggerClassName="slds-p-left_xx-small"
              />
            ) : null}
          </div>
        ) : null}
        {preMessage}
        {results}
        {postMessage}
      </div>
      {cta}
      <Button
        label={i18n.t('Create Scratch Org')}
        variant="brand"
        className="slds-m-top_medium slds-p-vertical_xx-small"
        onClick={() => setcreateOrgAgreementModalOpen(true)}
      />
      {backLink}
      {clickThroughAgreement && createOrg ? (
        <SpinOrgModal
          isOpen={createOrgAgreementModalOpen}
          clickThroughAgreement={clickThroughAgreement}
          handleClose={closeAgreementModal}
          createOrg={createOrg}
        />
      ) : null}
    </div>
  );
};

export default Intro;
