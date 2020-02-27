import React from "react";
import {PageStatus} from "../util/pageStatus";
import Button from "@material-ui/core/Button";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {red} from "@material-ui/core/colors";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

const GROUP_TRAVEL_API = (nationId) => "/grouptravel/" + nationId;
makeStyles(theme => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

class GroupTravel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            groupTravels: [],
            nationId: [],
            cards: []
        }
    }

    componentDidUpdate(prevProps, prevState, bo) {

        if (prevProps !== this.props && this.props.selectedNation != null) {
            this.fecthTravelGroup()
        }
    }

    fecthTravelGroup() {
        fetch(GROUP_TRAVEL_API(this.props.selectedNation.id))
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        this.setState({
                            groupTravels: data,
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

    adaptIncludedServices(data) {

        let adptedData = []
        let splittedData = data[0].split("\n");
        splittedData.forEach(it => (it !== "" ? adptedData.push(<li>{it}</li>) : it))
        return adptedData
    }

    adaptArray(data) {

        let adptedData = []
        data.forEach(it => (adptedData.push(<li>{it}</li>)));
        return adptedData
    }

    render() {
        if (window.matchMedia("all and (max-width: 667px)").matches) {
            console.log("piccolo schermo")

            return (this.state.groupTravels.map(row => (<Box>
                <br/>
                <Card>
                    <CardHeader style={{textAlign:'center'}}
                        title={row.travelName}
                        subheader={row.duration}
                    />
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Itinerario</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                {this.adaptArray(row.itinerary)}
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Servizi inclusi</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                {this.adaptIncludedServices(row.services.includedServices)}
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Servizi non inclusi</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                {this.adaptIncludedServices(row.services.notIncludedServices)}
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel style={{margin: 0}}>
                        <ExpansionPanelSummary
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Cassa Comune</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                La cassa comune include: {this.adaptIncludedServices(row.commonCash.includedServices)}
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <Typography style={{textAlign: 'center', margin: '5%'}}
                                classes={'MuiTypography-body1'}>Prezzo: {row.price}</Typography>
                    <Button variant="contained"
                            color="primary"
                            href={row.tourLink}
                            target="_blank"
                            rel="noopener noreferrer" npm
                            style={{cursor: 'pointer', width: '100%'}}>Scopri</Button>

                </Card>
            </Box>)));
        }
        else {
            return (
                this.state.groupTravels.map(row => (<Box>
                        <br/>
                        <Card>
                            <Grid container>
                                <Grid item xs={8}>
                                    <CardHeader
                                        title={row.travelName}
                                        subheader={row.duration}
                                    />
                                </Grid>
                                <Grid item xs={2} style={{textAlign: 'right'}}>
                                    <CardHeader
                                        title={row.price}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <div style={{textAlign: 'center'}}>
                                        <br/>
                                        <Button variant="contained"
                                                color="primary"
                                                href={row.tourLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{cursor: 'pointer'}}>Scopri</Button>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={3} style={{background: '#8080801c'}}>
                                    <Typography style={{marginLeft: '15px'}}>Itinerario</Typography>
                                    <CardContent>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {this.adaptArray(row.itinerary)}
                                        </Typography>
                                    </CardContent>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography style={{marginLeft: '15px'}}>Servizi inclusi</Typography>
                                    <CardContent>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {this.adaptIncludedServices(row.services.includedServices)}
                                        </Typography>
                                    </CardContent>
                                </Grid>
                                <Grid item xs={3} style={{background: '#8080801c'}}>
                                    <Typography style={{marginLeft: '15px'}}>Servizi non inclusi</Typography>
                                    <CardContent>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {this.adaptArray(row.services.notIncludedServices)}
                                        </Typography>
                                    </CardContent>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography style={{marginLeft: '15px'}}>Cassa comune</Typography>
                                    <CardContent>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {row.commonCash.description}
                                        </Typography>
                                        <br/>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            La cassa comune include: {this.adaptIncludedServices(
                                            row.commonCash.includedServices)}
                                        </Typography>
                                    </CardContent>
                                </Grid>
                            </Grid>
                        </Card>
                        <br/>
                    </Box>
                ))
            );
        }
    }
}

export default GroupTravel
