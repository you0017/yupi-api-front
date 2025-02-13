import { PageContainer } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import {getInterfaceInfoByIdUsingGet} from "@/services/yuapi-backend/interfaceInfoController";
import {useParams} from "@@/exports";
import {Button, Card, Descriptions, Form, message, Typography} from 'antd';
import TextArea from "antd/es/input/TextArea";

const Index: React.FC = () => {
  const [ loading, setLoading] = useState(false);
  const [ data, setData] = useState<any>();
  const id = Number(useParams().id);

  const loadData = async () => {
    if (!id){
      message.error("参数不存在");
      return;
    }
    try {
      const res = await getInterfaceInfoByIdUsingGet({
        id
      });
      setData(res?.data);
    } catch (e) {
      console.error("请求失败："+e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const {Text} = Typography;

  return (
    <PageContainer title={'查看接口文档'}>
      <Card>
        {
          data ? <Descriptions title={data.name} column={1}>
            <Descriptions.Item label="接口状态">
              {
                data.status === 0 ? <Text type={"danger"}>{"关闭"}</Text> : <Text type={"success"}>{"开启"}</Text>
              }
            </Descriptions.Item>
            <Descriptions.Item label="接口描述">{data.description}</Descriptions.Item>
            <Descriptions.Item label="接口地址">{data.url}</Descriptions.Item>
            <Descriptions.Item label="请求方式">{data.method}</Descriptions.Item>
            <Descriptions.Item label="请求参数">{data.requestParams}</Descriptions.Item>
            <Descriptions.Item label="请求头">{data.requestHeader}</Descriptions.Item>
            <Descriptions.Item label="响应头">{data.responseHeader}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
            <Descriptions.Item label="更新时间">{data.updateTime}</Descriptions.Item>
          </Descriptions> : <>接口不存在</>
        }
      </Card>
      <Card>
        <Form
          layout={"vertical"}
          name="basic"
          onFinish={null}
          onFinishFailed={null}
        >
          <Form.Item<number>
            label="请求参数："
            name="requestParams"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <TextArea/>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={null}>
              调用
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default Index;
