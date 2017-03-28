import React from 'react';
import {Form, Input, Select, Button} from 'antd';
import './Page1.less';

const countryOfIncorporationOrResidenceList = [
  "Angola",
  "Germany",
  "United Kingdom"
];

// TODO: Extract the replicated logic across pages to the parent
// TODO: Consider getting rid of the state and modifying the fieldValues in parent directly
// TODO: Countries need to be delivered via web service
// TODO: Alignment of the address fields

class Page1Form extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isCompany: props.fieldValues.companyType === 'company',
      countryOfIncorporationOrResidence: null
    };

    this.saveAndContinue = this.saveAndContinue.bind(this);
    this.changeBusinessType = this.changeBusinessType.bind(this);
    this.changeCountryOfIncorporationOrResidence = this.changeCountryOfIncorporationOrResidence.bind(this);
  }

  changeBusinessType(value) {
    if(value === 'company') {
      this.setState({isCompany: true});
    }
    else {
      this.setState({isCompany: false});
    }
  }

  changeCountryOfIncorporationOrResidence(value) {
    this.setState({countryOfIncorporationOrResidence: value});
  }

  saveAndContinue(e) {
    e.preventDefault();

    let isValid = true;
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if(errors) {
        isValid = false;
      }
    });

    if(!isValid) {
      return;
    }

    const data = this.props.form.getFieldsValue();
    this.props.saveValues(data);
    this.props.nextStep();
  }

  render() {
    const FormItem = Form.Item;
    const fieldValues = this.props.fieldValues;
    const {getFieldDecorator} = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 6}
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 14}
      }
    };

    return (
      <div>
        <Form>
          <FormItem {...formItemLayout} label="Business Type:">
            {getFieldDecorator('companyType', { initialValue: fieldValues.businessType,
              rules: [{required: true, message: 'This is a required field.'}], onChange: this.changeBusinessType
            })(
              <Select>
                <Option value="soleTrader">Invidual / Sole trader</Option>
                <Option value="company">Company</Option>
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label={this.state.isCompany ? 'Country of Incorporation' : 'Country of Residence'}>
            {getFieldDecorator('countryOfIncorporationOrResidence', { initialValue: fieldValues.countryOfIncorporationOrResidence,
              rules: [{required: true, message: 'This is a required field.'}], onChange: this.changeCountryOfIncorporationOrResidence
            })(
              <Select>
                {countryOfIncorporationOrResidenceList.map(item => <Option key={item}>{item}</Option>)}
              </Select>
            )}
          </FormItem>
          {
            this.state.isCompany &&
            <div>
              <FormItem {...formItemLayout} label="Legal Company Name">
                {getFieldDecorator('legalCompanyName', { initialValue: fieldValues.legalCompanyName,
                  rules: [{required: true, message: 'This is a required field.'}]
                })(
                  <Input type="text" />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="Company Registration Number">
                {getFieldDecorator('legalCompanyName', { initialValue: fieldValues.companyRegistrationNumber,
                  rules: [{required: true, message: 'This is a required field.'}]
                })(
                  <Input type="text" />
                )}
              </FormItem>
            </div>
          }
          {
            this.state.countryOfIncorporationOrResidence === "United Kingdom" &&
            <div>
              <FormItem {...formItemLayout} label="Year of Incorporation">
                {getFieldDecorator('yearOfIncorporation', { initialValue: fieldValues.yearOfIncorporation,
                  rules: [{required: true, message: 'This is a required field.'}]
                })(
                  <Input type="text" />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="Registered Address">
                {getFieldDecorator('registeredAddress.street', { initialValue: fieldValues.registeredAddress.street,
                  rules: [{required: true, message: 'This is a required field.'}]
                })(
                  <Input type="text" placeholder="Street" />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="   ">
                {getFieldDecorator('registeredAddress.city', { initialValue: fieldValues.registeredAddress.city,
                  rules: [{required: true, message: 'This is a required field.'}]
                })(
                  <Input type="text" placeholder="City" />
                )}
              </FormItem>
              <FormItem {...formItemLayout}>
                {getFieldDecorator('registeredAddress.zipCode', { initialValue: fieldValues.registeredAddress.zipCode,
                  rules: [{required: true, message: 'This is a required field.'}]
                })(
                  <Input type="text" placeholder="Postal / Zip code" />
                )}
              </FormItem>
            </div>
          }
          <FormItem>
            <Button type="primary" onClick={this.saveAndContinue}>Next</Button>
          </FormItem>
        </Form>
      </div>
    );
  }

}

const Page1 = Form.create()(Page1Form);
export default Page1;
