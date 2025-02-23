import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  PageContainer,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Button, Drawer, message } from 'antd';
import React, { useRef, useState } from 'react';
import {
  addInterfaceInfo, deleteInterfaceInfo, downlineInterfaceInfo,
  listInterfaceInfoByPage, onlineInterfaceInfo,
  updateInterfaceInfo
} from "@/services/yuapi-backend/interfaceInfoController";
import CreateModel from "@/pages/Admin/InterfaceInfo/components/CreateModel";
import UpdateModel from "@/pages/Admin/InterfaceInfo/components/UpdateModel";





const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.InterfaceInfoAddRequest>();
  const [selectedRowsState, setSelectedRows] = useState<API.InterfaceInfoAddRequest[]>([]);

  /**
   * @en-US online node
   * @zh-CN 上线节点
   *
   * @param fields
   */
  const handleOnline = async (fields: API.IdRequest) => {
    const hide = message.loading('发布中');
    try {
      await onlineInterfaceInfo({
        id: fields.id,
      });
      hide();
      message.success('发布成功');
      handleUpdateModalOpen(false);
      actionRef?.current?.reload();
      return true;
    } catch (error) {
      hide();
      message.error('发布失败,'+error.message);
      return false;
    }
  };
  /**
   * @en-US downline node
   * @zh-CN 下线节点
   *
   * @param fields
   */
  const handleDownline = async (fields: API.IdRequest) => {
    const hide = message.loading('下线中');
    try {
      await downlineInterfaceInfo({
        id: fields.id,
      });
      hide();
      message.success('下线成功');
      handleUpdateModalOpen(false);
      actionRef?.current?.reload();
      return true;
    } catch (error) {
      hide();
      message.error('下线失败,'+error.message);
      return false;
    }
  };

  /**
   * @en-US Update node
   * @zh-CN 更新节点
   *
   * @param fields
   */
  const handleUpdate = async (fields: API.InterfaceInfoAddRequest) => {
    const hide = message.loading('修改中');
    if (!currentRow){
      return ;
    }
    try {
      await updateInterfaceInfo({
        id: currentRow.id,
        ...fields,
      });
      hide();
      message.success('修改成功');
      handleUpdateModalOpen(false);
      actionRef?.current?.reload();
      return true;
    } catch (error) {
      hide();
      message.error('修改失败,'+error.message);
      return false;
    }
  };

  /**
   *  Delete node
   * @zh-CN 删除节点
   *
   * @param selectedRows
   */
  const handleRemove = async (record: API.DeleteRequest) => {
    const hide = message.loading('正在删除');
    if (!record) return true;
    try {
      await deleteInterfaceInfo({
        ...record
      });
      hide();
      message.success('删除成功');
      actionRef?.current?.reload();
      return true;
    } catch (error) {
      hide();
      message.error('删除失败,'+error.message);
      return false;
    }
  };

  /**
   * @en-US Add node
   * @zh-CN 添加节点
   * @param fields
   */
  const handleAdd = async (fields: API.InterfaceInfoAddRequest) => {
    const hide = message.loading('正在添加');
    try {
      await addInterfaceInfo({
        ...fields,
      });
      hide();
      message.success('创建成功');
      handleModalOpen(false);
      actionRef?.current?.reload();
      return true;
    } catch (error) {
      hide();
      message.error('创建失败,'+error.message);
      return false;
    }
  };

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  const columns: ProColumns<API.InterfaceInfo>[] = [
    {
      title: "id",
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true,
      width: 80, // 固定宽度
    },
    {
      title: '接口名称',
      dataIndex: 'name',
      valueType: "text",
      formItemProps: {
        rules: [
          {
            required: true,
            message: '接口名称为必填项',
          },
        ],
      },
      width: 200, // 固定宽度
    },
    {
      title: '描述',
      dataIndex: 'description',
      valueType: 'textarea',
      ellipsis: true, // 截断文本并显示省略号
    },
    {
      title: '请求方法',
      dataIndex: 'method',
      valueType: 'text'
    },
    {
      title: '接口地址',
      dataIndex: 'url',
      valueType: 'text'
    },
      {
        title: '请求参数',
        dataIndex: 'requestParams',
        valueType: 'jsonCode',
        autoSize: true, // 自动调整列宽
      },
    {
      title: '请求头',
      dataIndex: 'requestHeader',
      valueType: 'jsonCode',
    },
    {
      title: '响应头',
      dataIndex: 'responseHeader',
      valueType: 'jsonCode',
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        0: { text: '关闭', status: 'Default' },
        1: { text: '运行中', status: 'Processing' }
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInForm: true,
      renderText: (val: string) => {
        return val && val.length > 10 ? val.slice(0, 10) : val;
      },
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInForm: true,
      renderText: (val: string) => {
        return val && val.length > 10 ? val.slice(0, 10) : val;
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      hideInForm: true,
      render: (_, record : API.InterfaceInfo) => [
        <a
          key={"修改"+record.id}
          onClick={() => {
            handleUpdateModalOpen(true);
            setCurrentRow(record);
          }}
        >
          修改
        </a>,
        record.status === 0 ?<Button
            key={"发布"+record.id}
            type="text"
            onClick={() => {
              handleOnline({id: record.id})
              actionRef?.current?.reload();
            }}
        >
          发布
        </Button> : null,
        record.status === 1 ?<Button
            key={"下线"+record.id}
            type="text"
            danger={true}
            onClick={() => {
              handleDownline({id: record.id})
              actionRef?.current?.reload();
            }}
        >
          下线
        </Button> : null,
        <Button
          type={"text"}
          key={"删除"+record.id}
          danger
          onClick={() => {
            handleRemove(record)
          }}
        >
          删除
        </Button>
    ]
  }
]
  ;
  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={'查询表格'}
        actionRef={actionRef}
        rowKey="key"
        scroll={{ x: 'max-content' }} // 启用水平滚动条
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={async (params) =>{
          const res = await listInterfaceInfoByPage({
            current: params.current,
            pageSize: params.pageSize,
          });
          return {
            data: res.data.records,
            current: res.data.current,
            total: res.data.total
          }
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项 &nbsp;&nbsp;
              <span>
                服务调用次数总计 {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)} 万
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )}
      <UpdateModel
        columns={columns}
        onCancel={()=>{
          handleUpdateModalOpen(false)
        }}
        onSubmit={(values) =>{
          handleUpdate(values)
        }}
        visible={updateModalOpen}
        values={currentRow || {}}
      />
      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer>
      <CreateModel columns={columns} onCancel={()=>{handleModalOpen(false)}} onSubmit={(values)=>{handleAdd((values))}} visible={createModalOpen}/>
    </PageContainer>
  );
};
export default TableList;
