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
import {red} from "@material-ui/core/colors";

const discoverButtonStyle = {
    cursor: 'pointer',
    width: '100%'
};

const priceStyle = {
    textAlign: 'center',
    margin: '5%'
};

const subtitles = {
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
                        <Typography style={subtitles}>Itinerario</Typography>
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
                        <Typography style={subtitles}>Servizi inclusi</Typography>
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
                        <Typography style={subtitles}>Servizi non inclusi</Typography>
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
                        <Typography style={subtitles}>Cassa Comune</Typography>
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
