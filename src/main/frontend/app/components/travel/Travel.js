import React from "react"
import {PageStatus} from "../util/pageStatus";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import GroupTravel from "./GroupTravel";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import logo from "../../../../resources/static/logo.png";


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

        if (window.matchMedia("all and (max-width: 667px)").matches) {
            return (<div>
                    <CardMedia
                        component="img"
                        height="50%"
                        width="100%"
                        image="logo.png"
                        title="cuckooTribe"
                    />
                    <Autocomplete
                        id="combo-box-demo"
                        onChange={(event, value) => this.setSelectedNation(value)}
                        options={this.state.nations}
                        getOptionLabel={option => option.title}
                        renderInput={params => (
                            <TextField {...params} label="Dove vuoi andare?" variant="outlined" fullWidth/>
                        )}
                    />
                    <div>
                        <GroupTravel selectedNation={this.state.selectedNation}/>
                    </div>
                </div>
            );
        }
        else {
            return (<div>
                    <Grid container>

                        <Grid item xs={2}/>
                        <Grid item xs={8}>
                            <CardMedia
                                component="img"
                                height="50%"
                                width="100%"
                                image="logo.png"
                                title="cuckooTribe"
                            />
                            <Typography>
                                Nella vita potrai accumulare valore, ma non potrai mai conservare il tuo tempo. Consumare e possedere cose è veramente più semplice che vivere esperienze. Le cose hanno solo bisogno di soldi. Le esperienze hanno bisogno di soldi e di tempo. Usa il tuo tempo con saggezza, spedirlo dove il bisogno di avventura ti porta. TiMeMe, cerca la tua nuova esperienza:
                            </Typography>
                        </Grid>
                        <Grid item xs={2}/>

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
                                        <TextField {...params} label="Dove vuoi andare?" variant="outlined" fullWidth/>
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
                </div>

            );
        }
    }
}

function

adapt(data) {
    let adaptedData = [];
    data.forEach(it => adaptedData.push({title: it.name, id: it.id}))
    return adaptedData
}

export default Travel
