import axios from 'axios'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import URL_API from '../../components/api/Url'
import { Controller } from '../../components/header/Controller'
import { Chart, registerables } from 'chart.js'
import { Line } from 'react-chartjs-2'
import { BiLineChartDown, BiLineChart } from 'react-icons/bi'
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md'

Chart.register(...registerables)

const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"]

let i = 0

const currency = new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact'
})

const incomesData = ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']
const expensesData = ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']

export const CompanyHome = ({ user, company, reloadUser }) => {
    const page = company[0]?.company_name
    const pageName = 'home'
    const pageToken = company[0]?.company_id
    const month = new Date()

    const [analytics, setAnalytics] = useState([])

    const handleAnalytics = (database) => {
        axios.post(
            URL_API,
            { play: 'analytics', database: database },
            { headers: { "content-type": "application/json" } }
        ).then((result) => {
            setAnalytics(result.data)
        })
    }

    useEffect(() => {
        handleAnalytics(company[0]?.database_name)
    }, [company])

    const handleArrays = (analytics) => {
        for (let i = 0; i < 12; i++) {
            incomesData[i] = '0'
            expensesData[i] = '0'
        }
        analytics?.map(data => {
            data.incomes.monthly.map(date => {
                incomesData[date.month - 1] = date.total
            })
            data.expenses.monthly.map(date => {
                expensesData[date.month - 1] = date.total
            })
        })
    }

    useEffect(() => { analytics.length && handleArrays(analytics) }, [analytics])

    const reload = () => {
        handleAnalytics(company[0]?.database_name)
    }

    return (
        <Controller page={page} user={user} reload={reload} pageName={pageName} pageToken={pageToken} reloadUser={reloadUser}>
            <div className='flex gap-2'>
                <div className='w-2/3 shadow p-4 rounded'>
                    <Line
                        datasetIdKey='id'
                        data={
                            {
                                labels: months,
                                datasets: [
                                    {
                                        label: 'Incomes',
                                        data: incomesData,
                                        backgroundColor: 'rgba(134, 239, 172, 0.2)',
                                        borderColor: 'rgb(134 239 172)',
                                        tension: 0.5,
                                        fill: true
                                    },
                                    {
                                        label: 'Expenses',
                                        data: expensesData,
                                        backgroundColor: 'rgba(93, 173, 226, 0.2)',
                                        borderColor: 'rgb( 93, 173, 226 )',
                                        tension: 0.5,
                                        fill: true
                                    }
                                ]
                            }
                        }
                        options={{
                            scales: {
                                x: {

                                },
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }}
                    />
                </div>
                <div className='flex flex-col gap-2 w-1/3'>
                    <div className='p-4 shadow rounded flex-grow flex justify-center items-center'>
                        <div className='flex flex-col items-center gap-2'>
                            <div className='p-4 bg-secondary rounded-full max-w-[5rem] w-20 h-20 flex justify-center items-center'>
                                <BiLineChart size={40} />
                            </div>
                            <div>
                                <p className='text-lg tracking-wider capitalize font-semibold'>incomes</p>
                            </div>
                            <div className='text-3xl font-bold mt-2'>
                                <p>
                                    {
                                        incomesData &&
                                        currency.format(incomesData[month.getMonth()])
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='p-4 shadow rounded flex-grow flex justify-center items-center'>
                        <div className='flex flex-col items-center gap-2'>
                            <div className='p-4 bg-secondary rounded-full max-w-[5rem] w-20 h-20 flex justify-center items-center'>
                                <BiLineChartDown size={40} />
                            </div>
                            <div>
                                <p className='text-lg tracking-wider capitalize font-semibold'>expenses</p>
                            </div>
                            <div className='text-3xl font-bold mt-2'>
                                <p>
                                    {
                                        expensesData &&
                                        currency.format(expensesData[month.getMonth()])
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Controller>
    )
}   
