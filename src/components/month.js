import React from 'react';
import styled from 'styled-components'

const HeaderRow = styled.div`
  border-bottom: 1px solid #E3EAF5;
  margin-top: 70px;
`

const Row = styled.div`
  width: 490px;
  display: flex;
  flex-wrap: wrap;
`

const Day = styled.div`
  width: 70px;
  height: 70px;
  border-bottom: 1px solid #E3EAF5;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Indicator = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Placeholder = styled.div`
  height: 70px;
  width: ${props => props.width};
  transition: 0.3s
`


const renderWidth = (day) => {
  switch(day.getDay()) {
    case 0:
      return "420px"
    case 1:
      return "0px"
    case 2:
      return "70px"
    case 3:
      return "140px"
    case 4:
      return "210px"
    case 5:
      return "280px"
    case 6:
      return "350px"
    default:
      return "0px"
  }
}


const renderColor = (data) => {

  //cases
  //1. none planned --> white
  //2. planned some, none completed, in the future or today --> grey
  //3. planned some, some completed, in the past or today --> blue
  //4. planned some, none completed, in the past --> red
  //5. planned some, all completed, in the past or today --> green

  //not possible
  //planned some, some or all completed, in the future

  const today = new Date().toISOString().slice(0,10)
  const isTodayOrPast = data.day <= today
  const isInFuture = data.day > today

  const completedNone = data.completed === 0 && data.planned > 0
  const completedSome = data.completed > 0 && data.completed < data.planned
  const completedAll = data.completed === data.planned && data.planned > 0

  if (isTodayOrPast && completedNone) {
    return {color: '#fff', background: '#FF729F', fontWeight: 'bold'}
  } else if (isTodayOrPast && completedSome) {
    return {color: '#fff', background: '#74D4FA', fontWeight: 'bold'}
  } else if (isTodayOrPast && completedAll) {
    return {color: '#fff', background: '#64F58D', fontWeight: 'bold'}
  } else if (isInFuture && completedNone) {
    return {color: 'rgba(0,0,0,0.7)', background: 'rgba(0,0,0,0.1)'}
  } else {
    return {color: 'rgba(0,0,0,0.5)', background: '#fff'}
  }
}

const Month = (props) => {

  const days = props.daysOfMonth.reduce((obj, key) => {obj[key] = props.calendarDays[key]; return obj;}, {})

  return(
    <div>
      <HeaderRow>
        <h2>{props.monthName} {props.year}</h2>
      </HeaderRow>


      <Row>
        <Placeholder width={renderWidth(new Date(props.daysOfMonth[0]))}/>

        {
          Object.values(days).map(day =>

            <div key={day.day}>
              <Day>

                <Indicator style={renderColor({planned: day.planned, completed: day.completed, day: day.day})}>
                  {new Date(day.day).getDate()}
                </Indicator>

              </Day>
            </div>
          )
        }


      </Row>



    </div>
  )
}

export default Month;
