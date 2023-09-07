"use client"

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import nlLocale from '@fullcalendar/core/locales/nl'
import interactionPlugin from '@fullcalendar/interaction'

const Calender = async () => {


    return <div>
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek'
            }}
            locales={[nlLocale]}
            selectable={true}
        />
    </div>
}


export default Calender;
