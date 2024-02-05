import {useModel} from '@@/exports';
import {UploadOutlined} from '@ant-design/icons';
import {useEmotionCss} from '@ant-design/use-emotion-css';
import {Button, Form, Input, InputNumber, message, Upload} from 'antd';
import Title from 'antd/es/typography/Title';
import React, {useEffect, useState} from 'react';
import {addFoodUsingPost, getFoodByIdUsingGet} from "@/services/pet_ques/foodController";

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

const FoodAdd: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const {initialState, setInitialState} = useModel('@@initialState');
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
    let food_id = urlParams.get('food_id');
    if (food_id !== null) {
      getFoodByIdUsingGet({food_id: food_id}).then((res) => {
        if (res.code === 0) {
          message.success("获取成功");
          form.setFieldValue('food_name', res.data.food_name);
          form.setFieldValue('food_pic_path', res.data.food_pic_path);
          form.setFieldValue('food_price', res.data.food_price);
          form.setFieldValue('food_hunger', res.data.food_hunger);
          form.setFieldValue('food_mood', res.data.food_mood);
          form.setFieldValue('food_thirsty', res.data.food_thirsty);
          form.setFieldValue('food_endu', res.data.food_endu);
          form.setFieldValue('food_exp', res.data.food_exp);
          form.setFieldValue('food_health', res.data.food_health);
        } else {
          message.error("获取失败:", res.msg)
        }
      });
    }
    // 如果有清理逻辑，可以在返回的函数中处理
    return () => {
      // 清理逻辑
    };
  }, []); // 空的依赖项数组确保该效果只在组件挂载时执行一次

  const onFinish = async (values: any) => {
    try {
      const res = await addFoodUsingPost(values);
      if (res.code === 0) {
        message.success("添加成功" + res);
      } else {
        message.error("添加失败:", res.msg)
      }
    } catch (error) {
      message.error("添加失败" + error);
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
          添加食物
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
          name="food_name"
          label="食物名称"
          rules={[{required: true, message: '请输入食物名称'}]}
        >
          <Input
            style={{width: 400}}
          />
        </Form.Item>
        <Form.Item
          name="food_pic_path"
          label="图片名称"
          rules={[{required: true, message: '请输入图片名称'}]}
        >
          <Input
            style={{width: 400}}
          />
        </Form.Item>
        <Form.Item
          name="food_price"
          label="食物价格"
          rules={[{required: true, message: '请输入食物价格'}]}
        >
          <InputNumber<string>
            style={{width: 400}}
            step="0.01"
            precision={2}
          />
        </Form.Item>
        <Form.Item
          name="food_hunger"
          label="食物补充饥饿值"
          rules={[{required: true, message: '请输入食物补充饥饿值'}]}
        >
          <InputNumber<string>
            style={{width: 400}}
            step="0.01"
            precision={2}
          />
        </Form.Item>
        <Form.Item
          name="food_mood"
          label="食物补充心情值"
          rules={[{required: true, message: '请输入食物补充心情值'}]}
        >
          <InputNumber<string>
            style={{width: 400}}
            step="0.01"
            precision={2}
          />
        </Form.Item>
        <Form.Item
          name="food_thirsty"
          label="食物补充口渴值"
          rules={[{required: true, message: '请输入食物补充口渴值'}]}
        >
          <InputNumber<string>
            style={{width: 400}}
            step="0.01"
            precision={2}
          />
        </Form.Item>
        <Form.Item
          name="food_endu"
          label="食物补充耐力值"
          rules={[{required: true, message: '请输入食物补充耐力值'}]}
        >
          <InputNumber<string>
            style={{width: 400}}
            step="0.01"
            precision={2}
          />
        </Form.Item>
        <Form.Item
          name="food_exp"
          label="食物提供经验值"
          rules={[{required: true, message: '请输入食物提供经验值'}]}
        >
          <InputNumber<string>
            style={{width: 400}}
            step="0.01"
            precision={2}
          />
        </Form.Item>
        <Form.Item
          name="food_health"
          label="食物补充健康值"
          rules={[{required: true, message: '请输入食物补充健康值'}]}
        >
          <InputNumber<string>
            style={{width: 400}}
            step="0.01"
            precision={2}
          />
        </Form.Item>
        <Form.Item wrapperCol={{...layout.wrapperCol, offset: 4}}>
          <Button type="primary" htmlType="submit" style={{width: '100%'}}>
            添加
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default FoodAdd;
