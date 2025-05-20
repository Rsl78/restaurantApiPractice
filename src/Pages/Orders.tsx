import React, {useState, useRef, useEffect} from 'react';
import {baseUrl} from "../utilis/webinfo";
import {Button} from 'primereact/button';
import {FilterMatchMode} from 'primereact/api';
import {DataTable, DataTableFilterMeta, DataTableExpandedRows, DataTableRowEvent,} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Toast} from 'primereact/toast';
import {InputText} from 'primereact/inputtext';
import {Dropdown, DropdownChangeEvent} from 'primereact/dropdown';
import {Tag} from 'primereact/tag';

interface FilterUrl {
    idFilter: string;
    orderTypeFilter: number | null | undefined;
    orderStatusFilter: number | null | undefined;
    cookingStatusFilter: number | null | undefined;
    paymentStatusFilter: number | null | undefined;
}

const Orders = () => {
    const [orderData, setOrderData] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // filter state
    const [paymentStatusFilter, setPaymentStatusFilter] = useState<{ id: number, name: string } | null>(null);
    const [cookingStatusFilter, setCookingStatusFilter] = useState<{ id: number, name: string } | null>(null);
    const [orderTypeFilter, setOrderTypeFilter] = useState<{ id: number, name: string } | null>(null);
    const [orderStatusFilter, setOrderStatusFilter] = useState<{ id: number, name: string } | null>(null);
    const [idFilter, setIdFilter] = useState<string>('');

    // paginator state
    // const [first, setFirst] = useState<number>(0);
    // const [rows, setRows] = useState<number>(10);
    // const [page, setPage] = useState<number>(0);
    // const [totalRecords, setTotalRecords] = useState<number>(0);
    // useEffect(() => {
    //     const pages = Math.ceil(first / rows)
    //     setPage(pages)
    // }, [first, rows]);

    const [limitData, setLimitData] = useState<number>(10);
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [totalData, setTotalData] = useState<number>(0);
    useEffect(() => {
        let pages = Math.ceil(pageNumber / limitData);
        setCurrentPage(pages)
    }, [pageNumber, limitData]);

    // filter default value state
    const [expandedRows, setExpandedRows] = useState<any | undefined>(undefined);
    const toast = useRef<Toast>(null);
    const [orderTypeOptions, setOrderTypeOptions] = useState<{ id: number, name: string }[]>([]);
    const [orderStatusOptions, setOrderStatusOptions] = useState<{ id: number, name: string }[]>([]);
    const paymentStatusOptions: { id: number, name: string }[] = [
        {
            id: 1,
            name: 'Completed'
        },
        {
            id: 2,
            name: 'Incomplete'
        }
    ]
    const cookingStatusOptions: { id: number, name: string }[] = [
        {
            id: 1,
            name: 'Completed'
        },
        {
            id: 2,
            name: 'Pending'
        }
    ]

    useEffect(() => {
        fetch(`${baseUrl.url}/api/order_type?page=0&size=100`, {
            method: 'GET',
            headers: {
                "Authorization": `${baseUrl.token}`
            }
        }).then(res => res.json()).then(data => setOrderTypeOptions(data.data.items)).catch(error => console.log(error));

    }, []);
    useEffect(() => {
        fetch(`${baseUrl.url}/api/order_status?page=0&size=100`, {
            method: 'GET',
            headers: {
                "Authorization": `${baseUrl.token}`
            }
        }).then(res => res.json()).then(data => setOrderStatusOptions(data.data.items)).catch(error => console.log(error));

    }, []);

    const buildFilterUrl = ({
                                idFilter,
                                orderTypeFilter,
                                orderStatusFilter,
                                cookingStatusFilter,
                                paymentStatusFilter
                            }: FilterUrl) => {

        const filterParams: any[] = [];

        if (idFilter) {
            filterParams.push(["order_number", "like", `${idFilter}`]);
        }

        if (orderTypeFilter) {
            const selectedOrderTypeFilter = ["order_type_id", orderTypeFilter];
            if (selectedOrderTypeFilter) {
                if (filterParams.length > 0) {
                    filterParams.push(["AND"]);
                }
                filterParams.push(["order_type_id", orderTypeFilter]);
            }
        }

        if (orderStatusFilter) {
            const selectedOrderStatusFilter = ["order_status_id", orderStatusFilter];
            if (selectedOrderStatusFilter) {
                if (filterParams.length > 0) {
                    filterParams.push(["AND"]);
                }
                filterParams.push(["order_status_id", orderStatusFilter]);
            }
        }

        if (cookingStatusFilter) {
            const selectedCookingStatusFilter = ["cooking_complete_status", cookingStatusFilter];
            if (selectedCookingStatusFilter) {
                if (filterParams.length > 0) {
                    filterParams.push(["AND"]);
                }
                filterParams.push(["cooking_complete_status", cookingStatusFilter]);
            }
        }

        if (paymentStatusFilter) {
            const selectedPaymentStatusFilter = ["payment_status", paymentStatusFilter];
            if (selectedPaymentStatusFilter) {
                if (filterParams.length > 0) {
                    filterParams.push(["AND"]);
                }
                filterParams.push(["payment_status", paymentStatusFilter]);
            }
        }
        // console.log(filterParams);

        return filterParams.length > 0 ? `${baseUrl.url}/api/order?page=${currentPage}&size=${limitData}&filters=${JSON.stringify(filterParams)}` : `${baseUrl.url}/api/order?page=${currentPage}&size=${limitData}`
    }

    const handlePageChange = (event: any) => {
        setPageNumber(event.first)
        setLimitData(event.rows)
    }

    console.log('page:', currentPage, "first:", pageNumber, "rows: ", limitData)


    useEffect(() => {
        const params = {
            idFilter,
            orderTypeFilter: orderTypeFilter?.id,
            orderStatusFilter: orderStatusFilter?.id,
            cookingStatusFilter: cookingStatusFilter?.id,
            paymentStatusFilter: paymentStatusFilter?.id
        }
        const url = buildFilterUrl(params)

        fetch(url, {
            method: 'GET',
            headers: {
                "Authorization": `${baseUrl.token}`
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setOrderData(data.data.items);
                setTotalData(data?.data?.total)
                setLoading(false);
            }).catch(error => console.log(error));
    }, [paymentStatusFilter, orderTypeFilter, orderStatusFilter, cookingStatusFilter, idFilter, currentPage]);

    console.log('total: ', totalData)

    const [filters] = useState<DataTableFilterMeta>({
        order_number: {value: null, matchMode: FilterMatchMode.CONTAINS},
        'order_status.name': {value: null, matchMode: FilterMatchMode.EQUALS},
        'order_type.name': {value: null, matchMode: FilterMatchMode.EQUALS},
        cooking_complete_status: {value: null, matchMode: FilterMatchMode.EQUALS},
        payment_status: {value: null, matchMode: FilterMatchMode.EQUALS},
    });
    const getSeverity = (status: string) => {
        switch (status) {
            case 'Cancelled':
                return 'danger';

            case 'Completed':
                return 'success';

            case 'Take-Away' || 'Dine-In':
                return 'info';

            case 'Pending' || 'Incomplete':
                return 'warning';

            case 'renewal':
                return null;
        }
    };
    // payment status filter
    const paymentBodyTemplate = (rowData: any) => {
        const paymentStatus = rowData?.payment_status === 1 ? 'Completed' : 'Incomplete'
        return <Tag value={paymentStatus} severity={getSeverity(paymentStatus)}/>;
        // return <p>{rowData?.payment_status === 1 ? 'Completed' : 'Incomplete'}</p>;
    };
    // Cooking status filter
    const cookingBodyTemplate = (rowData: any) => {
        const cookingStatus = rowData?.cooking_complete_status === 1 ? 'Completed' : 'Pending'
        return <Tag value={cookingStatus} severity={getSeverity(cookingStatus)}/>;
        // return <p>{rowData?.cooking_complete_status === 1 ? 'Completed' : 'Pending'}</p>;
    };
    // order type filter
    const orderTypeBodyTemplate = (rowData: any) => {
        return <p>{rowData?.order_type.name}</p>;
    }
    // order status filter
    const orderStatusBodyTemplate = (rowData: any) => {
        return <p>{rowData?.order_status.name}</p>;
    }
    // id filter elements
    const idFilterTemplate = () => {
        return (
            <InputText type="text" placeholder="Enter order ID" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setIdFilter(e.target.value)
                console.log(idFilter)
            }}/>
        );
    };
    // expander
    const allowExpansion = (rowData: any) => {
        return rowData?.food_list!.length > 0;
    };
    const onRowExpand = (event: DataTableRowEvent) => {
        toast.current?.show({severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000});
    };
    const onRowCollapse = (event: DataTableRowEvent) => {
        toast.current?.show({severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000});
    };
    const expandAll = () => {
        let _expandedRows: DataTableExpandedRows = {};

        orderData.forEach((p: any) => (_expandedRows[`${p.id}`] = true));

        setExpandedRows(_expandedRows);
    };
    const collapseAll = () => {
        setExpandedRows(undefined);
    };
    const header = (<div className="flex flex-wrap justify-content-end gap-2">
        <Button icon="pi pi-plus" label="Expand All" onClick={expandAll} text/>
        <Button icon="pi pi-minus" label="Collapse All" onClick={collapseAll} text/>
    </div>);
    const quantityBodyTemplate = (rowData: any) => rowData.size_list?.[0]?.quantity;
    const priceBodyTemplate = (rowData: any) => rowData.size_list?.[0]?.price;
    const imageBodyTemplate = (rowData: any) => {
        // console.log(rowData.food_item.food_photo_url)
        return <img src={`${baseUrl.url}/${rowData.food_item.food_photo_url}`} alt={rowData.image} width="64px"
                    className="shadow-4 border-round-sm h-5rem w-5rem"/>;
    };
    const rowExpansionTemplate = (data: any) => {
        // console.log(data.food_list);
        return (
            <div className="p-3">
                <h5>Orders for {data.order_number}</h5>
                <DataTable value={data.food_list}>

                    <Column field="food_item.name" header="Name" sortable></Column>
                    <Column header="Image" body={imageBodyTemplate}/>
                    <Column field="food_item.description" header="Description" sortable></Column>
                    <Column header="Quantity" sortable body={quantityBodyTemplate}></Column>
                    <Column header="Price" sortable body={priceBodyTemplate}></Column>
                </DataTable>
            </div>
        );
    };

    return (
        <div className={"card"}>
            <h1>Orders Page</h1>

            <DataTable value={orderData}
                       dataKey="id"
                       filters={filters}
                       filterDisplay="row"
                       loading={loading}
                       emptyMessage="No customers found."
                       expandedRows={expandedRows}
                       onRowToggle={(e) => setExpandedRows(e.data)}
                       onRowExpand={onRowExpand} onRowCollapse={onRowCollapse}
                       rowExpansionTemplate={rowExpansionTemplate}
                       header={header}
                       tableStyle={{minWidth: '60rem'}}
                       paginator={orderData.length > 0}
                       rows={limitData}
                       totalRecords={totalData}
                       lazy
                       first={pageNumber}
                       onPage={(e) => {
                           setPageNumber(e.first);
                           setLimitData(e.rows);
                       }}
                // rowsPerPageOptions={[10, 25, 50, 100]}
            >

                <Column expander={allowExpansion} style={{width: '5rem'}}/>

                {/*id input column*/}
                <Column field="order_number" header="Order Number" filter filterPlaceholder="Search by name"
                        style={{minWidth: '12rem'}} filterElement={idFilterTemplate}/>

                {/*Cooking status*/}
                <Column field="cooking_complete_status" header="Cooking Status" filterMenuStyle={{width: '14rem'}}
                        style={{minWidth: '12rem'}} body={cookingBodyTemplate} filter showFilterMenu={false}
                        filterElement={
                            <Dropdown value={cookingStatusFilter} options={cookingStatusOptions}
                                      onChange={(e: DropdownChangeEvent) => {
                                          setCookingStatusFilter(e.value);
                                          // console.log('payment value:', e.value)
                                      }}
                                      optionLabel={'name'}
                                      filter
                                      filterBy={'name'}
                                      showFilterClear
                                      placeholder="Select Cooking Status"
                                      className="p-column-filter"
                                      showClear
                                      style={{minWidth: '12rem'}}/>
                        }
                />

                {/*Order Type Column*/}
                <Column field="order_type.name" header="Order Type" filterMenuStyle={{width: '14rem'}}
                        style={{minWidth: '12rem'}} body={orderTypeBodyTemplate} filter showFilterMenu={false}
                        filterElement={
                            <Dropdown value={orderTypeFilter} options={orderTypeOptions}
                                      onChange={(e: DropdownChangeEvent) => {
                                          setOrderTypeFilter(e.value);
                                          // console.log('payment value:', e.value)
                                      }}
                                      optionLabel={'name'}
                                      filter
                                      filterBy={'name'}
                                      showFilterClear
                                      placeholder="Select Order Type"
                                      className="p-column-filter"
                                      showClear
                                      style={{minWidth: '12rem'}}/>
                        }
                />

                {/*payment status column*/}
                <Column field="payment_status" header="Payment Status" filterMenuStyle={{width: '14rem'}}
                        style={{minWidth: '12rem'}} body={paymentBodyTemplate} filter showFilterMenu={false}
                        filterElement={
                            <Dropdown value={paymentStatusFilter} options={paymentStatusOptions}
                                      onChange={(e: DropdownChangeEvent) => {
                                          setPaymentStatusFilter(e.value);
                                      }}
                                      optionLabel={'name'}
                                      filter
                                      filterBy={'name'}
                                      showFilterClear
                                      placeholder="Select Payment Status"
                                      className="p-column-filter"
                                      showClear
                                      style={{minWidth: '12rem'}}/>
                        }
                />

                {/*    Order status*/}
                <Column field="order_status.name" header="Order Status" filterMenuStyle={{width: '14rem'}}
                        style={{minWidth: '12rem'}} body={orderStatusBodyTemplate} filter showFilterMenu={false}
                        filterElement={
                            <Dropdown value={orderStatusFilter} options={orderStatusOptions}
                                      onChange={(e: DropdownChangeEvent) => {
                                          setOrderStatusFilter(e.value);
                                          // console.log('payment value:', e.value)
                                      }}
                                      optionLabel={'name'}
                                      filter
                                      filterBy={'name'}
                                      showFilterClear
                                      placeholder="Select Order Status"
                                      className="p-column-filter"
                                      showClear
                                      style={{minWidth: '12rem'}}/>
                        }
                />
            </DataTable>
        </div>
    );
};

export default Orders;
