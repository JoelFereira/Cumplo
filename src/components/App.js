import 'date-fns';
import React from 'react';
import Graphycs from './Graphycs';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Axios from 'axios';
import './../styles/Styles.sass'

import {
  MuiPickersUtilsProvider,
  DatePicker,
} from '@material-ui/pickers';

class App extends React.Component {
  state = {
    initDate: null,
    endDate: null,
    values: null
  }

  searchValues = () => {
    if (this.state.endDate != null && this.state.initDate != null) {
      let apiKey = '9c84db4d447c80c74961a72245371245cb7ac15f'
      Axios.get(`https://cors-anywhere.herokuapp.com/https://api.sbif.cl/api-sbifv3/recursos_api/dolar/periodo/${this.state.initDate.getFullYear()}/${this.state.initDate.getMonth() + 1}/dias_i/${this.state.initDate.getDate()}/${this.state.endDate.getFullYear()}/${this.state.endDate.getMonth() + 1}/dias_f/${this.state.endDate.getDate()}?apikey=${apiKey}&formato=json`)
        .then(
          r => {
            this.setState({ values: r.data })
          }
        )
    }
  }

  handleInitDate = async (date) => {
    await this.setState({ initDate: date })
    this.searchValues()
  }

  handleEndDate = async (date) => {
    await this.setState({ endDate: date })
    this.searchValues()
  }

  render() {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <DatePicker
            margin="normal"
            id="date-picker-dialog-init"
            label="Seleccionar Fecha Inicial"
            format="dd/MM/yyyy"
            maxDate={new Date()}
            value={this.state.initDate}
            onChange={this.handleInitDate}
          />
          <DatePicker
            margin="normal"
            id="date-picker-dialog-end"
            label="Seleccionar Fecha Final"
            format="dd/MM/yyyy"
            minDate={this.state.initDate}
            maxDate={new Date()}
            disabled={this.state.initDate == null}
            value={this.state.endDate}
            onChange={this.handleEndDate}
          />
        </Grid>
        <Graphycs values={this.state.values}></Graphycs>
      </MuiPickersUtilsProvider>
    );
  }
}

export default App;
