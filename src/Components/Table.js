import React, { useState, useEffect } from 'react'
import axios from 'axios'
import BootstrapTable from 'react-bootstrap-table-next'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import paginationFactory from "react-bootstrap-table2-paginator"
import "react-bootstrap-table2-paginator"
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import '../../src/App.css'
import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';



const App = () => {


    const [data, setData] = useState([]);
    const [graphpoint, setGraphPoints] = useState([])

    async function fetchMovies() {
        const response = await axios.get('https://api.coinstats.app/public/v1/charts?period=1m&coinId=ethereum');
        setGraphPoints(response?.data);

    }
    console.log(graphpoint)


    useEffect(() => {
        axios
            .get('https://api.coinstats.app/public/v1/coins?skip=0&limit=20&currency=USD')
            .then((res) => {
                setData(res.data.coins)
            })

        fetchMovies()

    }, [0])

    const columns = [


        {
            dataField: 'rank', sort: true,
            text: '#',
            filter: textFilter(),
            headerStyle: (col,colindex)=>{
                return {width: "5%"}
            }
        },

        {
            dataField: 'name',
            text: 'NAME',
            filter: textFilter(),
            formatter: (value, row) => {
                return (
                    <div className='Coins-images'>
                        <img src={row.icon} width={25} height={25} />  <span> {row.name} </span> <span className='Symbol'> .{row.symbol} </span>
                    </div>
                )

            },
            headerStyle: (col,colindex)=>{
                return {width: "14%"}
            }
            
        },

        {
            dataField: 'priceChange1d',
            text: '24H CHANGE',
            filter: textFilter(),
            formatter: (value, row) => {
                if (value < 0) {
                    return <p style={{ color: "red", fontWeight: "bold" }}><ArrowDropDownIcon/>{value}</p>
                }
                else {
                    return <p style={{ color: "green", fontWeight: "bold" }}><ArrowDropUpIcon/>{value}</p>
                }
            },
        },


        {
            dataField: 'price',
            text: 'Price',
            filter: textFilter(),
            formatter: (value, row) => {
                return "$" + value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
            }
        },



        {
            dataField: 'priceBtc',
            text: 'Price IN BTC',
            filter: textFilter(),
        },

        {
            dataField: 'marketCap',
            text: 'MARKET CAP',
            filter: textFilter(),
            formatter: (value, row) => {
                return "$" + value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
            }
        },

        {
            dataField: 'volume',
            text: 'VOLUME 24H',
            filter: textFilter(),
            formatter: (value, row) => {
                return "$" + value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
            }
        },

        {
            dataField: 'chart',
            filter: textFilter(),
            formatter: (value, row) => {
                return (
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="110" height="30" style={{ textAlign: "center" }}>

                            <polyline

                                points="1637484900,4342.765077968876,0.07384138653414987,1"
                                stroke="#E64B60" strokeLinecap ="round" strokeWidth ="1.4" fill="none"></polyline>
                                

                        </svg>
                    
                    </div >
                )
            },
            text: 'CHART',
            
        },

        {
            dataField: <MoreVertIcon/>,
            text: <span><MoreVertIcon/>||</span>,
            formatter: (value, row) => {
                return (
                    <div>
                        <MoreHorizIcon/>
                    </div>
                )
            },
            headerStyle: (col,colindex)=>{
                return {width: "4%"}
            }

        },



    ]
    const pagination = paginationFactory({
        showTotal: true,

       
    })


    return (
        <div>
            <div>

                <nav className = "navbar navbar-expand-lg">
                    <div className ="container-fluid">
                        <div className ="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className ="navbar-nav">
                                <a className ="nav-link anchor-bottom" aria-current="page" href="#">CRYPTOCURRENCIES</a>
                                <a className ="nav-link" href="#">EXCHANGES</a>
                                <a className ="nav-link" href="#">FAVORITES</a>
                                <a className ="nav-link" href="#">DEFI</a>
                                <a className ="nav-link" href="#">HEATMAP</a>
                            </div>
                        </div>
                    </div>
                </nav>
                <hr style={{color: "grey"}}/>

                <ToolkitProvider
                    bootstrap4
                    keyField="id"
                    columns={columns}
                    data={data}

                >
                    {
                        props => (
                            <React.Fragment>

                                <BootstrapTable
                                    bordered={false}
                                    pagination={pagination}
                                    filter={filterFactory()}
                                    {...props.baseProps}
                                    striped
                                    hover
                                />
                            </React.Fragment>
                        )
                    }

                </ToolkitProvider>
            </div>


        </div>
    )

}

export default App