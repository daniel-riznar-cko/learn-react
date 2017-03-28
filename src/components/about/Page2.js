import {Form, Input, Switch, Button, Icon} from 'antd';
import React from 'react';
import './Page2.less';

let uuid = 0;

class Page2Form extends React.Component {

  constructor(props) {
    super(props);

    this.remove = this.remove.bind(this);
    this.add = this.add.bind(this);
    this.saveAndContinue = this.saveAndContinue.bind(this);
    this.prevStep = this.prevStep.bind(this);
  }

  remove(k) {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    if(keys.length === 1) {
      return;
    }

    form.setFieldsValue({
      keys: keys.filter(key => key !== k)
    });
  }

  add() {
    uuid++;
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);

    form.setFieldsValue({
      keys: nextKeys
    });
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

  prevStep() {
    this.props.prevStep();
  }

  render() {
    const FormItem = Form.Item;
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 4}
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 20}
      }
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 }
      }
    };

    getFieldDecorator('keys', { initialValue: [uuid] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
      return (
        <FormItem
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
          label={index === 0 ? 'Website URL' : ''}
          required={false}
          key={k}
        >
          {getFieldDecorator(`names-${k}`, {
            rules: [{
              required: true,
              whitespace: true,
              message: "This is a required field, if you don't need it, please remove it."
            }]
          })(
            <Input className="url-input" />
          )}
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            disabled={keys.length === 1}
            onClick={() => this.remove(k)}
          />
        </FormItem>
      );
    });

    return (
      <Form>
        <FormItem {...formItemLayout} label="I'm accepting credit/debit card payments online">
          {getFieldDecorator('acceptingCreditCardPaymentsOnline', { initialValue: this.props.acceptingCreditCardPaymentsOnline,
            rules: [{required: true, message: 'This is a required field.'}]
          })(
            <Switch checkedChildren="Yes" unCheckedChildren="No" />
          )}
        </FormItem>
        <FormItem>
          <p className="url-note">
            Please list the URLs that you want to process online for:
            (add URLs with the 'Add field' button - the limit is 5 URLs)
          </p>
        </FormItem>

        {formItems}

        <FormItem {...formItemLayoutWithOutLabel}>
          <Button id="add-field" type="dashed" disabled={keys.length === 5} onClick={this.add}>
            <Icon type="plus" /> Add field
          </Button>
        </FormItem>
        <FormItem>
          <Button type="primary" onClick={this.prevStep}>Previous</Button>
          <Button type="primary" onClick={this.saveAndContinue}>Next</Button>
        </FormItem>
      </Form>
    );
  }
}

const Page2 = Form.create()(Page2Form);
export default Page2;
