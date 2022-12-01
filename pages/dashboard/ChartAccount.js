import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import URL_API from '../../components/api/Url'
import { Controller } from '../../components/header/Controller'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { MdOutlineAdd } from 'react-icons/md'
import { NewChartAccount } from '../../components/controllers/NewChartAccount'
import { CgSpinner } from 'react-icons/cg'
import { TbReportAnalytics } from 'react-icons/tb'
import { DataTable } from '../../components/controllers/charts/DataTable'
import { UpdateChartAccount } from '../../components/controllers/UpdateChartAccount'
import { DeleteChartAccount } from '../../components/controllers/DeleteChartAccount'
import { NewReport } from '../../components/controllers/NewReport'

export const ChartAccount = ({ user, company, reloadUser }) => {
    const page = company[0]?.company_name
    const pageName = 'chartofaccount'
    const pageToken = company[0]?.company_id

    const [isAdd, setAdd] = useState(false)
    const [isEdit, setEdit] = useState(false)
    const [isDelete, setDelete] = useState(false)
    const [isReport, setReport] = useState(false)

    const [chart, setChart] = useState([])
    const [subChart, setSubChart] = useState([])
    const [details, setDetails] = useState([])
    const [expanded, setExpanded] = useState(false)

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false)
    }

    const handleChart = useCallback((database) => {
        axios.post(
            URL_API,
            { play: 'getchart', database: database },
            { headers: { "content-type": "application/json" } }
        ).then((result) => {
            setChart(result.data)
        })
    }, [])

    useEffect(() => {
        setChart([])
        handleChart(company[0]?.database_name)
    }, [company])

    useEffect(() => {
        setSubChart([])
        chart &&
            chart.map(item =>
                item.sub.map(subs =>
                    setSubChart(sub => [...sub, subs])
                )
            )
    }, [chart])

    const reload = () => {
        handleChart(company[0]?.database_name)
    }

    const handleEditList = ({ id, action }) => {
        setDetails(subChart.filter(sub => sub.account_sub_id === id))

        switch (action) {
            case 'edit':
                setEdit(true)
                break
            case 'delete':
                setDelete(true)
                break
        }
    }

    return (
        <Controller page={page} user={user} reload={reload} pageName={pageName} pageToken={pageToken} reloadUser={reloadUser}>
            <div className='h-full'>
                {chart.length ?
                    <div>
                        <div className='mb-4 flex items-center gap-2'>
                            <Button
                                variant='contained'
                                className='flex gap-2'
                                onClick={() => { setAdd(true) }}
                            >
                                <MdOutlineAdd size={17} />
                                add new
                            </Button>
                            <Button
                                variant='contained'
                                className='flex gap-2'
                                color='success'
                                onClick={() => { setReport(true) }}
                            >
                                <TbReportAnalytics size={17} />
                                extract report
                            </Button>
                        </div>
                        <div>
                            {
                                chart &&
                                chart.map((item, index) => (
                                    <Accordion
                                        expanded={expanded === index}
                                        onChange={handleChange(index)}
                                        key={index}
                                    >
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header"
                                            sx={{ backgroundColor: '#ebebeb', borderRadius: '4px 4px 0 0' }}
                                        >
                                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                                {item.account_name}
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <DataTable sub={item.sub} user={user} handleEditList={handleEditList} />
                                        </AccordionDetails>
                                    </Accordion>
                                ))
                            }
                        </div>
                        <NewChartAccount isModule={isAdd} setModule={setAdd} database={company[0]?.database_name} charts={chart} reload={reload} />
                        <UpdateChartAccount isModule={isEdit} setModule={setEdit} database={company[0]?.database_name} charts={chart} reload={reload} details={details} />
                        <DeleteChartAccount isModule={isDelete} setModule={setDelete} database={company[0]?.database_name} reload={reload} details={details} />
                        <NewReport isModule={isReport} setModule={setReport} database={company[0]?.database_name} charts={chart} user={user} />
                    </div>
                    :
                    <div className='flex justify-center items-center min-h-full'>
                        <CgSpinner className='animate-spin' size={50} />
                    </div>
                }
            </div>
        </Controller>
    )
}
