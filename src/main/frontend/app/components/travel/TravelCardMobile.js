import React from "react";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Button from "@material-ui/core/Button";
import {adaptIncludedServices, adaptIncludedServicesWithPrefix, adaptArray} from '../util/adaptTravel.js'
import {makeStyles} from "@material-ui/core/styles";
import {green, red} from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import {AirportShuttleOutlined, CheckCircle, Clear, MonetizationOn} from "@material-ui/icons";

const discoverButtonStyle = {
    cursor: 'pointer',
    width: '100%'
};

const priceStyle = {
    textAlign: 'center',
    margin: '5%'
};

const subtitlesFontStyle = {
    fontWeight: 'bold'
};

class TravelCardMobile extends React.Component {

    render() {

        return (<Box>
            <br/>
            <Card>
                <CardHeader style={{textAlign: 'center'}}
                            title={this.props.nation.travelName}
                            subheader={this.props.duration}
                />
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Grid container>
                            <Grid item xs={1}>
                                <AirportShuttleOutlined fontSize="small" color={"primary"}/>
                            </Grid>
                            <Grid item xs={11}>
                                <Typography style={subtitlesFontStyle}>Itinerario</Typography>
                            </Grid>
                        </Grid>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            {adaptArray(this.props.nation.itinerary)}
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Grid container>
                            <Grid item xs={1}>
                                <CheckCircle fontSize="small" style={{color: green[500]}}/>
                            </Grid>
                            <Grid item xs={11}>
                                <Typography style={subtitlesFontStyle}>Servizi inclusi</Typography>
                            </Grid>
                        </Grid>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            {adaptIncludedServices(this.props.nation.services.includedServices)}
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Grid container>
                            <Grid item xs={1}>
                                <Clear fontSize="small" color="secondary"/>
                            </Grid>
                            <Grid item xs={11}>
                                <Typography style={subtitlesFontStyle}>Servizi non inclusi</Typography>
                            </Grid>
                        </Grid>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            {adaptIncludedServices(this.props.nation.services.notIncludedServices)}
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel style={{margin: 0}}>
                    <ExpansionPanelSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Grid container>
                            <Grid item xs={1}>
                                <MonetizationOn fontSize="small" color="primary"/>
                            </Grid>
                            <Grid item xs={11}>
                                <Typography style={subtitlesFontStyle}>Cassa comune</Typography>
                            </Grid>
                        </Grid>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            {adaptIncludedServicesWithPrefix(this.props.nation.commonCash.includedServices)}
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <Typography
                    classes={'MuiTypography-body1'} style={priceStyle}>Prezzo: {this.props.nation.price}</Typography>
                <Button variant="contained"
                        color="primary"
                        href={this.props.tourLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={discoverButtonStyle}
                >Scopri</Button>

            </Card>
        </Box>);
    }
}

export default TravelCardMobile;
