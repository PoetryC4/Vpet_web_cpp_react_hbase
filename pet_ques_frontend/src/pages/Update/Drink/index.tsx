import {useModel} from '@@/exports';
import {UploadOutlined} from '@ant-design/icons';
import {useEmotionCss} from '@ant-design/use-emotion-css';
import {Button, Form, Input, InputNumber, message, Upload} from 'antd';
import Title from 'antd/es/typography/Title';
import React, {useEffect, useState} from 'react';
import {addDrinkUsingPost, getDrinkByIdUsingGet, updateDrinkUsingPost} from "@/services/pet_ques/drinkController";

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

const DrinkUpdate: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const {initialState, setInitialState} = useModel('@@initialState');
  const [curDrinkId, setCurDrinkId] = useState<number>(-1);
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
    return loading;
  }

  const [form] = Form.useForm();

  useEffect(() => {
    const urlParams = new URL(window.location.href).searchParams;
    let drinkId = urlParams.get('drinkId');
    if (drinkId !== null) {
      getDrinkByIdUsingGet({drinkId: drinkId}).then((res) => {
        if (res != null) {
          setCurDrinkId(res.drinkId || -1)
          form.setFieldValue('drinkName', res.drinkName);
          form.setFieldValue('drinkPicPath', res.drinkPicPath);
          form.setFieldValue('drinkPrice', res.drinkPrice);
          form.setFieldValue('drinkHunger', res.drinkHunger);
          form.setFieldValue('drinkMood', res.drinkMood);
          form.setFieldValue('drinkThirsty', res.drinkThirsty);
          form.setFieldValue('drinkEndu', res.drinkEndu);
          form.setFieldValue('drinkExp', res.drinkExp);
          form.setFieldValue('drinkHealth', res.drinkHealth);
        } else {
          message.error("获取失败");
        }
      });
    } else {
      message.error("缺少drinkId")
    }
    // 如果有清理逻辑，可以在返回的函数中处理
    return () => {
      // 清理逻辑
    };
  }, []); // 空的依赖项数组确保该效果只在组件挂载时执行一次

  const onFinish = async (values: any) => {
    if (curDrinkId == null || curDrinkId < 0) {
      message.error("无法修改，缺少drinkId");
      return;
    }
    try {
      const res = await updateDrinkUsingPost({...values, drinkId: curDrinkId});
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
          修改饮料
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
          name="drinkName"
          label="饮料名称"
          rules={[{required: true, message: '请输入饮料名称'}]}
        >
          <Input
            style={{width: 400}}
          />
        </Form.Item>
        <Form.Item
          name="drinkPicPath"
          label="图片名称"
          rules={[{required: true, message: '请输入图片名称'}]}
        >
          <Input
            style={{width: 400}}
          />
        </Form.Item>
        <Form.Item
          name="drinkPrice"
          label="饮料价格"
          rules={[{required: true, message: '请输入饮料价格'}]}
        >
          <InputNumber<string>
            style={{width: 400}}
            step="0.01"
            precision={2}
            stringMode
          />
        </Form.Item>
        <Form.Item
          name="drinkHunger"
          label="饮料补充饥饿值"
          rules={[{required: true, message: '请输入饮料补充饥饿值'}]}
        >
          <InputNumber<string>
            style={{width: 400}}
            step="0.01"
            precision={2}
            stringMode
          />
        </Form.Item>
        <Form.Item
          name="drinkMood"
          label="饮料补充心情值"
          rules={[{required: true, message: '请输入饮料补充心情值'}]}
        >
          <InputNumber<string>
            style={{width: 400}}
            step="0.01"
            precision={2}
            stringMode
          />
        </Form.Item>
        <Form.Item
          name="drinkThirsty"
          label="饮料补充口渴值"
          rules={[{required: true, message: '请输入饮料补充口渴值'}]}
        >
          <InputNumber<string>
            style={{width: 400}}
            step="0.01"
            precision={2}
            stringMode
          />
        </Form.Item>
        <Form.Item
          name="drinkEndu"
          label="饮料补充耐力值"
          rules={[{required: true, message: '请输入饮料补充耐力值'}]}
        >
          <InputNumber<string>
            style={{width: 400}}
            step="0.01"
            precision={2}
            stringMode
          />
        </Form.Item>
        <Form.Item
          name="drinkExp"
          label="饮料提供经验值"
          rules={[{required: true, message: '请输入饮料提供经验值'}]}
        >
          <InputNumber<string>
            style={{width: 400}}
            step="0.01"
            precision={2}
            stringMode
          />
        </Form.Item>
        <Form.Item
          name="drinkHealth"
          label="饮料补充健康值"
          rules={[{required: true, message: '请输入饮料补充健康值'}]}
        >
          <InputNumber<string>
            style={{width: 400}}
            step="0.01"
            precision={2}
            stringMode
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
export default DrinkUpdate;
