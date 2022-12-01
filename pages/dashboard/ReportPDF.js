import React from 'react'
import { PDF } from '../../components/controllers/PDF'
import { DisplayModule } from '../../components/modules/DisplayModule'

export const ReportPDF = ({ isModule, setModule, details, chart, charts, period, user }) => {
    return (
        <DisplayModule isModule={isModule} setModule={setModule} mx>
            <PDF details={details} chart={chart} charts={charts} period={period} user={user} />
        </DisplayModule>
    )
}
