import { FC, useEffect, useState } from 'react';
import { selectAllMedicine, selectAllOrderByBuy, deleteMedicine, insert, updated, selectAllOrderBySale, selectAllOrderByProfit } from '@/api/medicine/index'
import { Button, DatePicker, Drawer, DrawerProps, Input, message, Popconfirm, Select, Space, Table } from 'antd';
import {
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons'
import usePagination from '@/hooks/usePagination';
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";
interface IIndexProps {

};

interface DataType {
    id: number;
    name: string;
    number: number;
    last_data: string;
    buy_price: string,
    sale_price: string
}
const Index: FC<IIndexProps> = () => {
    const [roule, setRoule] = useState<string>("Default")

    const [medicineList, setMedicineList] = useState<DataType[]>([])
    const getMedicineListData = () => {

        switch (roule) {
            case "Default":
                selectAllMedicine().then((res) => {
                    setMedicineList(res.data.data)
                })
                break;
            case "Buy": selectAllOrderByBuy().then((res) => {
                setMedicineList(res.data.data)
            })
                break;
            case "Sale": selectAllOrderBySale().then((res) => {
                setMedicineList(res.data.data)
            })
                break;
            case "Profit": selectAllOrderByProfit().then((res) => {
                setMedicineList(res.data.data)
            })
                break;
        }

    }
    useEffect(() => {
        getMedicineListData()

    }, [roule])

    const config = usePagination({
        position: ['bottomLeft'],
        showSizeChanger: true,
        pageSizeOptions: [1, 2, 3, 4],
        showQuickJumper: true
    })

    const deleteMedicineById = (data: { id: number }) => {
        deleteMedicine(data).then((res) => {
            if (res.data.code === 200) {
                message.success("???????????????")
                getMedicineListData()
            } else {
                message.error("???????????????")
            }
        })
    }
    const [updatedIdValue, setUpdatedIdValue] = useState<number>(0)
    const [updatednameValue, setUpdateNameValue] = useState<string>("")
    const [updatednumberValue, setUpdateNumberValue] = useState<number>(0)
    const [updatedtimeValue, setUpdateTimeValue] = useState<string>("")
    const [updatedbuyPriceValue, setUpdateBuyPriceValue] = useState<number>(0)
    const [updatedsalePriceValue, setUpdateSalePriceValue] = useState<number>(0)
    const [updatedgrowPlaceValue, setUpdateGrowPlaceValue] = useState<string>("")
    const columns = [

        {
            title: '????????????',
            dataIndex: "id",
            key: "id"
        },
        {
            title: '?????????',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '??????/???',
            dataIndex: 'buy_price',
            key: 'buy_price',
        },
        {
            title: '??????/???',
            dataIndex: 'sale_price',
            key: 'sale_price',
        },

        {
            title: '????????????/???',
            dataIndex: 'medicine_number',
            key: 'medicine_number',
        },
        {
            title: '??????????????????',
            dataIndex: 'last_data',
            key: 'last_data',
        },
        {
            title: '???????????????',
            dataIndex: 'grow_place',
            key: 'grow_place',
        },
        {
            title: '??????',
            render(_: any, record: any, index: any) {
                return (
                    <Space>
                        <Button
                            type='ghost'
                            shape="circle"
                            icon={<EditOutlined />}
                            onClick={(e) => {
                                e.stopPropagation()
                                setUpdatedIdValue(record.id)
                                setUpdateOpen(true)
                                setUpdateNameValue(record.name)
                                setUpdateNumberValue(record.medicine_number)
                                setUpdateTimeValue(record.last_data)
                                setUpdateBuyPriceValue(record.buy_price)
                                setUpdateSalePriceValue(record.sale_price)
                                setUpdateGrowPlaceValue(record.grow_place)
                            }}
                        ></Button>
                        <Popconfirm
                            title={"??????????????????"}
                            onConfirm={() => {
                                let data = { id: record.id }
                                deleteMedicineById(data)
                            }}
                        >
                            <Button
                                danger
                                onClick={(e) => {
                                    e.stopPropagation()
                                }}
                                shape="circle"
                                icon={<DeleteOutlined />}>
                            </Button>
                        </Popconfirm>
                    </Space>
                )
            }
        },
    ];

    const [height] = useState(document.body.offsetHeight)

    const [open, setOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [placement] = useState<DrawerProps['placement']>('right');

    const [nameValue, setNameValue] = useState<string>("")
    const [numberValue, setNumberValue] = useState<Number>(0)
    const [timeValue, setTimeValue] = useState<string>("")
    const [buyPriceValue, setBuyPriceValue] = useState<number>(0)
    const [salePriceValue, setSalePriceValue] = useState<number>(0)
    const [growPlaceValue, setGrowPlaceValue] = useState<string>("?????????")

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const onUpdatedClose = () => {
        setUpdateOpen(false);
    };

    const navigate = useNavigate();

    return (
        <>
            <div style={{
                width: "100%",
                position: "relative",
                height: "45px"
            }}>
                <Button type={roule === "Default" ? "primary" : "default"}
                    onClick={() => {
                        setRoule("Default")
                    }}
                    style={{ marginLeft: "10px" }}
                >????????????</Button>
                <Button type={roule === "Buy" ? "primary" : "default"}
                    onClick={() => {
                        setRoule("Buy")
                    }}
                    style={{ marginLeft: "10px" }}
                >????????????</Button>
                <Button type={roule === "Sale" ? "primary" : "default"}
                    onClick={() => {
                        setRoule("Sale")
                    }}
                    style={{ marginLeft: "10px" }}
                >????????????</Button>
                <Button type={roule === "Profit" ? "primary" : "default"}
                    onClick={() => {
                        setRoule("Profit")
                    }}
                    style={{ marginLeft: "10px" }}
                >????????????</Button>
                <Button
                    type="primary"
                    style={{
                        position: "absolute",
                        right: "0"
                    }}
                    onClick={() => {
                        showDrawer()
                    }}
                >????????????</Button>
            </div>
            <Table
                dataSource={medicineList}
                columns={columns}
                rowKey={(record) => record.id}
                scroll={{ y: height - 330 }}
                pagination={config}
                onRow={(record) => {
                    return {
                        onClick: (e) => {
                            if ((e.target as HTMLElement).tagName!=="TD") { 
                                return null
                            };
                            navigate(`details?id=${record.id}`)
                        },
                    }
                }}
            ></Table>
            <Drawer
                title="??????????????????"
                placement={placement}
                width={350}
                onClose={onClose}
                open={open}
                extra={
                    <Space>
                        <Button onClick={onClose}>??????</Button>
                        <Button type="primary" onClick={() => {
                            if (isNaN(numberValue as unknown as number) || isNaN(buyPriceValue) || isNaN(salePriceValue) || nameValue.length === 0 || buyPriceValue === 0 || salePriceValue === 0 || timeValue.length === 0 || numberValue < 0) {
                                message.error("???????????????????????????")

                            } else if (buyPriceValue > salePriceValue) {
                                message.error("???????????????????????????")

                            } else {
                                insert({ name: nameValue, medicine_number: numberValue, last_data: timeValue, buy_price: buyPriceValue, sale_price: salePriceValue, grow_place: growPlaceValue }).then(res => {
                                    if (res.data.code === 200) {
                                        message.success("????????????")
                                        getMedicineListData()

                                        setOpen(false);
                                    } else {
                                        message.error("????????????")
                                    }
                                })

                            }

                        }}>
                            ????????????
                        </Button>
                    </Space>
                }

            >
                <Input
                    onChange={(e) => {
                        setNameValue(e.target.value)
                    }}

                    placeholder='??????????????????'
                    allowClear={true}

                />

                <DatePicker

                    placeholder={"?????????????????????"}
                    style={{ width: "100%", margin: "10px 0" }}
                    onChange={(data, dataString) => {
                        // console.log(data);

                        setTimeValue(dataString)
                    }}
                />
                <Input
                    onChange={(e) => {
                        if (isNaN(e.target.value as unknown as number)) {
                            message.error("???????????????")
                        }
                        setNumberValue(e.target.value as unknown as number)

                    }}

                    placeholder='???????????????/???'
                    allowClear={true}


                />
                <Input
                    placeholder='???????????????'
                    style={{ margin: "5px 0" }}
                    allowClear={true}
                    onChange={(e) => {
                        if (isNaN(e.target.value as unknown as number)) {
                            message.error("??????????????????")
                        }
                        setBuyPriceValue(e.target.value as unknown as number)
                    }}
                />

                <Input
                    allowClear={true}

                    placeholder='???????????????'
                    style={{ margin: "5px 0" }}
                    onChange={(e) => {
                        if (isNaN(e.target.value as unknown as number)) {
                            message.error("??????????????????")
                        }
                        setSalePriceValue(e.target.value as unknown as number)
                    }}
                />

                <Select
                    onChange={(value) => {
                        setGrowPlaceValue(value)
                    }}
                    defaultValue="?????????"
                    style={{ width: "100%" }}
                    options={[
                        {
                            value: '?????????',
                            label: '?????????',
                        },
                        {
                            value: '????????????',
                            label: '????????????',
                        },
                        {
                            value: '?????????',
                            label: '?????????',
                        },
                        {
                            value: '?????????',
                            label: '?????????',
                        },
                        {
                            value: '?????????',
                            label: '?????????',
                        },
                        {
                            value: '?????????',
                            label: '?????????',
                        },
                        {
                            value: '?????????',
                            label: '?????????',
                        },
                        {
                            value: '?????????',
                            label: '?????????',
                        },
                        {
                            value: '?????????',
                            label: '?????????',
                        },
                        {
                            value: '?????????',
                            label: '?????????',
                        },
                        {
                            value: '?????????',
                            label: '?????????',
                        },
                        {
                            value: '?????????????????????',
                            label: '?????????????????????',
                        },
                        {
                            value: '?????????????????????',
                            label: '?????????????????????',
                        }
                    ]}
                />


            </Drawer>

            <Drawer
                title="????????????"
                width={350}
                placement={"left"}
                closable={true}
                destroyOnClose={true}
                onClose={onUpdatedClose}
                open={updateOpen}
                extra={<Space>
                    <Button onClick={onUpdatedClose}>??????</Button>
                    <Button type="primary" onClick={() => {


                        if (isNaN(updatednumberValue as unknown as number) || isNaN(updatedbuyPriceValue) || isNaN(updatedsalePriceValue) || updatednameValue.length === 0 || updatedbuyPriceValue === 0 || updatedsalePriceValue === 0 || updatedtimeValue.length === 0 || updatednumberValue < 0) {
                            message.error("???????????????????????????")

                        } else if (updatedbuyPriceValue > updatedsalePriceValue) {
                            message.error("???????????????????????????")

                        } else {
                            updated(
                                {
                                    id: updatedIdValue,
                                    name: updatednameValue,
                                    medicine_number: updatednumberValue,
                                    last_data: updatedtimeValue,
                                    buy_price: updatedbuyPriceValue,
                                    sale_price: updatedsalePriceValue,
                                    grow_place: updatedgrowPlaceValue
                                }
                            ).then(res => {
                                // console.log(res.data);
                                message.success("????????????")
                                getMedicineListData()
                            })
                            onUpdatedClose()
                        }



                    }}>
                        ????????????
                    </Button>
                </Space>}
            >
                <Input
                    disabled
                    value={updatednameValue}
                    onChange={(e) => {
                    }}
                    allowClear={true}

                />

                <DatePicker
                    defaultValue={dayjs(updatedtimeValue)}
                    style={{ width: "100%", margin: "10px 0" }}
                    onChange={(data, dataString) => {
                        // console.log(dataString);

                        setUpdateTimeValue(dataString)
                    }}
                />
                <Input
                    onChange={(e) => {
                        if (isNaN(e.target.value as unknown as number)) {
                            message.error("???????????????")
                        }
                        setUpdateNumberValue(e.target.value as unknown as number)
                    }}
                    defaultValue={updatednumberValue.toString()}
                    allowClear={true}
                />
                <Input
                    defaultValue={updatedbuyPriceValue.toString()}
                    style={{ margin: "5px 0" }}
                    allowClear={true}
                    onChange={(e) => {
                        if (isNaN(e.target.value as unknown as number)) {
                            message.error("??????????????????")
                        }
                        setUpdateBuyPriceValue(e.target.value as unknown as number)
                    }}
                />

                <Input
                    allowClear={true}
                    defaultValue={updatedsalePriceValue.toString()}


                    style={{ margin: "5px 0" }}
                    onChange={(e) => {
                        if (isNaN(e.target.value as unknown as number)) {
                            message.error("??????????????????")
                        } else {
                            setUpdateSalePriceValue(e.target.value as unknown as number)
                        }
                    }}
                />

                <Select
                    onChange={(value) => {
                        setUpdateGrowPlaceValue(value)
                    }}
                    defaultValue={updatedgrowPlaceValue}
                    style={{ width: "100%" }}
                    options={[
                        {
                            value: '?????????',
                            label: '?????????',
                        },
                        {
                            value: '????????????',
                            label: '????????????',
                        },
                        {
                            value: '?????????',
                            label: '?????????',
                        },
                        {
                            value: '?????????',
                            label: '?????????',
                        },
                        {
                            value: '?????????',
                            label: '?????????',
                        },
                        {
                            value: '?????????',
                            label: '?????????',
                        },
                        {
                            value: '?????????',
                            label: '?????????',
                        },
                        {
                            value: '?????????',
                            label: '?????????',
                        },
                        {
                            value: '?????????',
                            label: '?????????',
                        },
                        {
                            value: '?????????',
                            label: '?????????',
                        },
                        {
                            value: '?????????',
                            label: '?????????',
                        },
                        {
                            value: '?????????????????????',
                            label: '?????????????????????',
                        },
                        {
                            value: '?????????????????????',
                            label: '?????????????????????',
                        }
                    ]}
                />
            </Drawer>
        </>

    )

};

export default Index;