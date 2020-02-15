import React from "react"
import {PageStatus} from "../util/pageStatus";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import GroupTravel from "./GroupTravel";
import Grid from "@material-ui/core/Grid";

const EXPERIENCE_TRAVEL_API = `/grouptravel/nations`;

class Travel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nations: [{}],
            selectedNations: {},
            travels: PageStatus.LOADING
        }
    }

    componentDidMount() {

        fetch(EXPERIENCE_TRAVEL_API)
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        this.setState({
                            nations: adapt(data),
                        });
                    }.bind(this));
                }
                else {
                    throw new Error(response.status);
                }
            }.bind(this))
            .catch(function () {
                this.setState({
                    pageStatus: PageStatus.ERROR,
                    errorMessage: "Oops, something goes wrong!"
                });
            }.bind(this));
    }

    setSelectedNation(nation) {
        this.setState({
            selectedNation: nation
        })
    }

    render() {
        console.log(this.state);

        return (<Grid container>
                <Grid item xs={4}/>
                <Grid item xs={4}>
                    <div>
                        <br/>
                        <br/>
                        <Autocomplete
                            id="combo-box-demo"
                            onChange={(event, value) => this.setSelectedNation(value)}
                            options={this.state.nations}
                            getOptionLabel={option => option.title}
                            renderInput={params => (
                                <TextField {...params} label="Cerca i viaggi" variant="outlined" fullWidth/>
                            )}
                        />
                    </div>
                </Grid>
                <Grid item xs={4}/>

                <Grid item xs={1}/>
                <Grid item xs={10}>
                    <GroupTravel selectedNation={this.state.selectedNation}/>
                </Grid>
                <Grid item xs={1}/>
            </Grid>
        );

    }
}

function adapt(data) {
    let adaptedData = [];
    data.forEach(it => adaptedData.push({title: it.name, id: it.id}))
    return adaptedData
}

export default Travel
