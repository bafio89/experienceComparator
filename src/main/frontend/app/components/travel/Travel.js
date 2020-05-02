import React from "react"
import {PageStatus} from "../util/pageStatus";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import GroupTravel from "./GroupTravel";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import {Card} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

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
            return (<div style={{
                    backgroundImage: 'url("images/home.png")',
                    height: '219px',
                    backgroundPositionX: 'center',
                    backgroundPositionY: '-25px',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                }}>
                    <Card style={{
                        maxWidth: '100%',
                        background: 'none',
                        marginBottom: "-7px",
                        boxShadow: "none"
                    }}>
                        <CardMedia
                            component="img"
                            height="50%"
                            width="100%"
                            image="logo.png"
                            title="cuckooTribe"
                        />
                    </Card>
                    <Autocomplete
                        id="combo-box-demo"
                        onChange={(event, value) => this.setSelectedNation(value)}
                        options={this.state.nations}
                        getOptionLabel={option => option.title}
                        renderInput={params => (
                            <TextField style={{backgroundColor: "white"}} {...params} label="Dove vuoi andare?" variant="outlined" fullWidth/>
                        )}
                    />
                    <div>
                        <GroupTravel selectedNation={this.state.selectedNation}/>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div style={{
                    backgroundImage: 'url("images/home.png")',
                    height: '400px',
                    margin: '-16px',
                    backgroundPositionX: 'center',
                    backgroundPositionY: '-25px',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                }}>
                    <Grid container>
                        <Grid item xs={4}/>
                        <Grid item xs={4}>
                            <Card style={{
                                maxWidth: '100%',
                                background: 'none',
                                marginTop: '190px',
                                marginBottom: "-36px",
                                boxShadow: "none"
                            }}>
                                <CardMedia
                                    component="img"
                                    height="75%"
                                    width="100%"
                                    image="logo.png"
                                    title="cuckooTribe"
                                />
                            </Card>
                        </Grid>
                        <Grid item xs={4}/>

                        <Grid item xs={4}/>
                        <Grid item xs={4} style={{paddingLeft: '20px'}}>
                            <div>
                                <br/>
                                <br/>
                                <Autocomplete
                                    id="combo-box-demo"
                                    onChange={(event, value) => this.setSelectedNation(value)}
                                    options={this.state.nations}
                                    getOptionLabel={option => option.title}
                                    renderInput={params => (
                                        <TextField {...params} style={{backgroundColor: "white"}}
                                                   label="Dove vuoi andare?" variant="outlined"
                                                   fullWidth/>
                                    )}
                                />

                            </div>
                        </Grid>
                        <Grid item xs={4}/>
                    </Grid>

                    <Grid container>

                        <Grid item xs={1}/>
                        <Grid item xs={10} style={{marginTop: '33px'}}>
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
