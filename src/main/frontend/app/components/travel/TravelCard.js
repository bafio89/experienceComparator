import React from "react";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import {adaptIncludedServices, adaptIncludedServicesWithPrefix, adaptArray} from '../util/adaptTravel.js'
import {makeStyles} from "@material-ui/core/styles";

const priceStyle = {
    textAlign: 'center'
}

const subtitlesStyle = {
    fontWeight: 'bold',
    marginLeft: '15px',
    marginTop: '10px'

}

const contentCell = {
    borderRight: '1px solid #cdd0d2'
}

const headerStyle = {
    borderBottom: '1px solid #eff1f3'

}

class TravelCard extends React.Component {

    render() {

        return (<Box>
                <br/>
                <Card>
                    <Grid container style={headerStyle}>
                        <Grid item xs={8}>
                            <CardHeader
                                title={this.props.nation.travelName}
                                subheader={this.props.nation.duration}
                            />
                        </Grid>
                        <Grid item xs={2} style={{textAlign: 'right'}}>
                            <CardHeader
                                title={this.props.nation.price}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <div style={{textAlign: 'center'}}>
                                <br/>
                                <Button variant="contained"
                                        color="primary"
                                        href={this.props.nation.tourLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={priceStyle}>Scopri</Button>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={3} style={contentCell}>
                            <Typography style={subtitlesStyle}>Itinerario</Typography>
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {adaptArray(this.props.nation.itinerary)}
                                </Typography>
                            </CardContent>
                        </Grid>
                        <Grid item xs={3} style={contentCell}>
                            <Typography style={subtitlesStyle}>Servizi inclusi</Typography>
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {adaptIncludedServices(this.props.nation.services.includedServices)}
                                </Typography>
                            </CardContent>
                        </Grid>
                        <Grid item xs={3} style={contentCell}>
                            <Typography style={subtitlesStyle}>Servizi non inclusi</Typography>
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {adaptArray(this.props.nation.services.notIncludedServices)}
                                </Typography>
                            </CardContent>
                        </Grid>
                        <Grid item xs={3} style={contentCell}>
                            <Typography style={subtitlesStyle}>Cassa comune</Typography>
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {this.props.nation.commonCash.description}
                                </Typography>
                                <br/>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {adaptIncludedServicesWithPrefix(
                                        this.props.nation.commonCash.includedServices)}
                                </Typography>
                            </CardContent>
                        </Grid>
                    </Grid>
                </Card>
                <br/>
            </Box>
        )
    }
}

export default TravelCard
