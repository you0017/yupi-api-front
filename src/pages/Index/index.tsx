import { PageContainer } from '@ant-design/pro-components';
import { List } from 'antd';
import React, { useEffect, useState } from 'react';
import {listMyInterfaceInfoByPage} from "@/services/yuapi-backend/interfaceInfoController";

const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<API.InterfaceInfo[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [current, setCurrent] = useState<number>(1);

  const loadData = async (current = 1, pageSize = 5) => {
    try {
      const res = await listMyInterfaceInfoByPage({
        current: current,
        pageSize: pageSize,
      });
      setList(res?.data?.records ?? []);
      setTotal(res?.data?.total ?? 0);
      setCurrent(res?.data?.current ?? 1);
    } catch (e) {
      console.error("请求失败："+e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <PageContainer title={'在线接口开放平台'}>
      <List
        className="my-listt"
        loading={loading}
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item) => {
          const apiLink = `/Interface_info/${item.id}`;
          return (
            <List.Item
              actions={[<a key="list-loadmore-more" href={apiLink}>查看</a>]}
            >
              <List.Item.Meta
                title={<a href={apiLink}>{item.name}</a>}
                description={item.description}
              />
            </List.Item>
          )
        }}

        pagination={{
          pageSize: 5,
          onChange: (page, pageSize) => {
            loadData(page, pageSize);
          },
          total: total,
          current: current,
          showTotal: (total, range) => `共 ${total} 条记录 第 ${current}/${Math.ceil(total/5)}页`,
        }}
      />
    </PageContainer>
  );
};

export default Index;
