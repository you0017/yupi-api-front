import {
  ProColumns,ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Modal } from 'antd';
import React, {useEffect, useRef} from 'react';
import {values} from "lodash";
export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.RuleListItem>;
export type Props = {
  values: API.InterfaceInfo;
  columns: ProColumns<API.InterfaceInfo>;
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: API.InterfaceInfo) => Promise<void>;
  visible: boolean;
};
const CreateModel: React.FC<Props> = (props) => {
  //用于动态更新修改框打开时候的默认数据
  const formRef = useRef();
  useEffect(()=>{
    if (formRef){
      formRef.current?.setFieldsValue(props.values)
    }
  },[props.values])

  return (
    <Modal footer={null} visible={props.visible} onCancel={() => {props.onCancel?.()}}>
      <ProTable
        type={'form'}
        formRef={formRef}
        columns={props.columns}
        onSubmit={async (values) => {
          props.onSubmit?.(values);
        }}
        form={{
          initialValues: props.values,
        }}
      />
    </Modal>
  );
};
export default CreateModel;
