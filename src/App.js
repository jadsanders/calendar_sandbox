import React, { Component } from 'react';
import './App.css'
import styled from 'styled-components'
import Month from './components/month'


const Button = styled.div`
  height: 50px;
  width: 100%;
  cursor: pointer;
  background: rgba(0,0,0,0.1);
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 140px;
`

const DayRow = styled.div`
  height: 70px;
  display: flex;
  position: fixed;
  background: #fff;
  border-bottom: 1px solid #E3EAF5;
`

const SingleDay = styled.div`
  height: 100%;
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`

class App extends Component {

  state = {
    year: parseInt(new Date().toISOString().slice(0,4))
  }


  getDates(start, end) {
      for(var arr=[],dt=start; dt<=end; dt.setDate(dt.getDate()+1)){
          arr.push(new Date(dt));
      }
      return arr;
  };



  renderMonthName(month) {
    switch(month) {
      case 0:
        return 'Januar'
      case 1:
        return 'Februar'
      case 2:
        return 'März'
      case 3:
        return 'April'
      case 4:
        return 'Mai'
      case 5:
        return 'Juni'
      case 6:
        return 'Juli'
      case 7:
        return 'August'
      case 8:
        return 'September'
      case 9:
        return 'Oktober'
      case 10:
        return 'November'
      case 11:
        return 'Dezember'
      default:
        return null
    }

  }



  render() {

    const months = [0,1,2,3,4,5,6,7,8,9,10,11]
    const daysOfYear = this.getDates(new Date(`${this.state.year}-01-01`), new Date(`${this.state.year}-12-31`))

    const days = daysOfYear.map(day => day.toISOString().slice(0,10))

    const workouts = {
      "2019-01-01": {
        "day": "2019-01-01",
        "planned": 3,
        "completed": 3,
      },
      "2019-01-03": {
        "day": "2019-01-03",
        "planned": 1,
        "completed": 0,
      },
      "2019-01-10": {
        "day": "2019-01-10",
        "planned": 2,
        "completed": 1,
      },
      "2019-02-21": {
        "day": "2019-02-21",
        "planned": 1,
        "completed": 0,
      }
    }


    const calendarDays = days.reduce((accum, day) => {
      if (workouts[day]) accum[day] = workouts[day];
      else accum[day] = { day: day, planned: 0, completed: 0 };
      return accum;
    }, {});



    return (

      <div className="main">


        <div>
          <DayRow>
            <SingleDay>Mo</SingleDay>
            <SingleDay>Di</SingleDay>
            <SingleDay>Mi</SingleDay>
            <SingleDay>Do</SingleDay>
            <SingleDay>Fr</SingleDay>
            <SingleDay>Sa</SingleDay>
            <SingleDay>So</SingleDay>
          </DayRow>


          <div>
            <Button
              onClick={() => this.setState({year: this.state.year - 1})}
              visible={this.state.topVisible}
            >{this.state.year - 1}</Button>

              {
                months.map(month =>
                  <div style={{marginBottom: "35px"}} key={month}>
                    <Month
                      monthName={this.renderMonthName(month)}
                      daysOfMonth={Object.keys(calendarDays).filter(day => new Date(day).getMonth() === month)}
                      calendarDays={calendarDays}
                      year={this.state.year}
                    />
                  </div>
                )
              }

            <Button
              onClick={() => this.setState({year: this.state.year + 1})}
              visible={this.state.bottomVisible}
            >{this.state.year + 1}</Button>

          </div>
        </div>


      </div>
    );
  }
}

export default App;
