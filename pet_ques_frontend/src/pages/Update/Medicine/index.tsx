import {useModel} from '@@/exports';
import {UploadOutlined} from '@ant-design/icons';
import {useEmotionCss} from '@ant-design/use-emotion-css';
import {Button, Form, Input, InputNumber, message, Upload} from 'antd';
import Title from 'antd/es/typography/Title';
import React, {useEffect, useState} from 'react';
import {addMedicineUsingPost, getMedicineByIdUsingGet, updateMedicineUsingPost} from "@/services/pet_ques/medicineController";

const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16},
};
const normFile = (e: any) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e.fileList.slice(-1);
};
const validateMessages = {
  required: '${label} is required!',
};
/* eslint-enable no-template-curly-in-string */

const MedicineUpdate: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const {initialState, setInitialState} = useModel('@@initialState');
  const [curMedicineId, setCurMedicineId] = useState<number>(-1);
  const chartAddClass = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      overflow: 'auto',
      height: '100vh',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
      backgroundColor: '#fafafa',
    };
  });

  const [loading, setLoading] = useState(false);

  if (!initialState) {
    return (<div>加载错误</div>);
  }

  const [form] = Form.useForm();

  useEffect(() => {
    const urlParams = new URL(window.location.href).searchParams;
    let medicineId = urlParams.get('medicineId');
    if (medicineId !== null) {
      getMedicineByIdUsingGet({medicineId: medicineId}).then((res) => {
        if (res != null) {
          setCurMedicineId(res.medicineId || -1)
          form.setFieldValue('medicineName', res.medicineName);
          form.setFieldValue('medicinePicPath', res.medicinePicPath);
          form.setFieldValue('medicinePrice', res.medicinePrice);
          form.setFieldValue('medicineMood', res.medicineMood);
          form.setFieldValue('medicineEndu', res.medicineEndu);
          form.setFieldValue('medicineExp', res.medicineExp);
          form.setFieldValue('medicineHealth', res.medicineHealth);
        } else {
          message.error("获取失败");
        }
      });
    } else {
      message.error("缺少medicineId")
    }
    // 如果有清理逻辑，可以在返回的函数中处理
    return () => {
      // 清理逻辑
    };
  }, []); // 空的依赖项数组确保该效果只在组件挂载时执行一次

  const onFinish = async (values: any) => {
    if (curMedicineId == null || curMedicineId < 0) {
      message.error("无法修改，缺少medicineId");
      return;
    }
    try {
      const res = await updateMedicineUsingPost({...values, medicineId: curMedicineId});
      message.success("修改成功");
    } catch (error) {
      message.error("修改失败" + error);
    }
  };
  return (
    <div className={chartAddClass}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          height: 50,
          inset: '0',
          margin: '20px auto',
        }}
      >
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          height: 50,
          inset: '0',
          margin: '1px auto',
        }}
      >
        {/*<HomeOutlined style={{ fontSize: '24px', color: '#fff' }} />*/}
        <Title level={3} style={{color: '#222', textAlign: 'center'}}>
          修改药物
        </Title>
      </div>
      <Form
        labelAlign={'left'}
        {...layout}
        form={form}
        name="nest-messages"
        onFinish={onFinish}
        style={{width: 660, inset: 0, margin: '1% auto auto auto'}}
        validateMessages={validateMessages}
      >
        <Form.Item
          name="medicineName"
          label="药物名称"
          rules={[{required: true, message: '请输入药物名称'}]}
        >
          <Input
            style={{width: 400}}
          />
        </Form.Item>
        <Form.Item
          name="medicinePicPath"
          label="图片名称"
          rules={[{required: true, message: '请输入图片名称'}]}
        >
          <Input
            style={{width: 400}}
          />
        </Form.Item>
        <Form.Item
          name="medicinePrice"
          label="药物价格"
          rules={[{required: true, message: '请输入药物价格'}]}
        >
          <InputNumber<string>
            style={{width: 400}}
            step="0.01"
            precision={2}
          />
        </Form.Item>
        <Form.Item
          name="medicineMood"
          label="药物补充心情值"
          rules={[{required: true, message: '请输入药物补充心情值'}]}
        >
          <InputNumber<string>
            style={{width: 400}}
            step="0.01"
            precision={2}
          />
        </Form.Item>
        <Form.Item
          name="medicineEndu"
          label="药物补充耐力值"
          rules={[{required: true, message: '请输入药物补充耐力值'}]}
        >
          <InputNumber<string>
            style={{width: 400}}
            step="0.01"
            precision={2}
          />
        </Form.Item>
        <Form.Item
          name="medicineExp"
          label="药物提供经验值"
          rules={[{required: true, message: '请输入药物提供经验值'}]}
        >
          <InputNumber<string>
            style={{width: 400}}
            step="0.01"
            precision={2}
          />
        </Form.Item>
        <Form.Item
          name="medicineHealth"
          label="药物补充健康值"
          rules={[{required: true, message: '请输入药物补充健康值'}]}
        >
          <InputNumber<string>
            style={{width: 400}}
            step="0.01"
            precision={2}
          />
        </Form.Item>
        <Form.Item wrapperCol={{...layout.wrapperCol, offset: 4}}>
          <Button type="primary" htmlType="submit" style={{width: '100%'}}>
            修改
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default MedicineUpdate;
