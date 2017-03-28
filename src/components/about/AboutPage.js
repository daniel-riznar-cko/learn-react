import React from 'react';
import {Steps, Button, message, Form, Input, notification} from 'antd';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import './AboutPage.less';

const Step = Steps.Step;

let fieldValues = {
  // Page 1
  businessType: 'soleTrader',
  countryOfIncorporationOrResidence: null,
  legalBusinessName: null,
  companyRegistrationNumber: null,
  yearOfIncorporation: null,
  registeredAddress: {
    street: null,
    city: null,
    zipCode: null
  },
  // Page 2
  acceptingCreditCardPaymentsOnline: null,
  nameOnlinePaymentProvider: null,
  currentMonthlySalesVolume: null,
  currency: null,
  websiteUrlList: [],
  // Page 3
  firstName: null,
  lastName: null,
  passportNumber: null,
  emailAddress: null,
  address: {
    street: null,
    city: null,
    zipCode: null,
    country: null
  },
  // Page 4
  bankAccount: {
    accountName: null,
    country: null,
    bankName: null,
    bankAddress: {
      street: null,
      city: null
    },
    accountNumber: null,
    sortCode: null,
    currency: null
  },
  // Page 5
  requiredProcessingCurrencies: null,
  websiteUrl: null,
  phoneNumber: null,
  emailForFinancialStatement: null,
  // Page 6
  previousOnlineProcessingHistory: null,
  bankAccountExtract: null,
  passportCopyForShareholder1: null,
  personalProofAddressShareholder1: null
};

class AboutPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      current: 2
    };

    this.saveValues = this.saveValues.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.prevStep = this.prevStep.bind(this);
  }

  saveValues(fields) {
    fieldValues = Object.assign({}, fieldValues, fields);
  }

  nextStep() {
    const current = this.state.current + 1;
    this.setState({current});
  }

  prevStep() {
    const current = this.state.current - 1;
    this.setState({current});
  }

  render() {
    const steps = [
      {
        title: 'First',
        content: <Page1 fieldValues={fieldValues} nextStep={this.nextStep} saveValues={this.saveValues} />
      },
      {
        title: 'Second',
        content: <Page2 fieldValues={fieldValues} prevStep={this.prevStep} nextStep={this.nextStep} saveValues={this.saveValues} />
      },
      {
        title: 'Third',
        content: <Page3 prevStep={this.prevStep} nextStep={this.nextStep} />
      },
      {
        title: 'Fourth',
        content: 'Stub in content 4'
      },
      {
        title: 'Fifth',
        content: 'Stub in content 5'
      }
    ];

    const { current } = this.state;

    return (
      <div>
        <div>
          <Steps current={current}>
            {steps.map(item => <Step key={item.title} />)}
          </Steps>
          <div className="steps-content">{steps[this.state.current].content}</div>
        </div>
      </div>
    );
  }
}

export default AboutPage;
