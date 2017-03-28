import {Form, Upload, Button, Icon} from 'antd';
import React from 'react';
import './Page3.less';

class Page3Form extends React.Component {

  constructor(props) {
    super(props);

    this.prevStep = this.prevStep.bind(this);
    this.saveAndContinue = this.saveAndContinue.bind(this);
  }

  prevStep() {
    this.props.prevStep();
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

    this.props.nextStep();
  }

  render() {
    const Dragger = Upload.Dragger;
    const FormItem = Form.Item;

    const { getFieldDecorator } = this.props.form;
    const uploadProps = {
      name: 'file',
      multiple: true,
      // showUploadList: true,
      action: 'http://localhost:52156/api/merchantApplicationForm/SaveFile'
    };

    return (
      <Form>
        <FormItem>
          {getFieldDecorator('uploadDragger', {rules: [{required: true, message: 'Please upload file.'}]} ) (
            <div>
              <Dragger {...uploadProps}>
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
              </Dragger>
            </div>
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" onClick={this.prevStep}>Previous</Button>
          <Button type="primary" onClick={this.saveAndContinue}>Next</Button>
        </FormItem>
      </Form>
    );
  }
}

const Page3 = Form.create()(Page3Form);
export default Page3;
