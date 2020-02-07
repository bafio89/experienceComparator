import React from "react";
import {PageStatus} from "../util/pageStatus";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const GROUP_TRAVEL_API = (nationId) => "/grouptravel/" + nationId;

class GroupTravel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            groupTravels: [],
            nationId: []
        }
    }

    componentDidUpdate(prevProps, prevState, bo) {

        if (prevProps !== this.props && this.props.selectedNation != null) {
            this.fecthTravelGroup();
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

    setNationIdState(selectedNation) {
        this.setState({
            nationId: selectedNation
        })
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
        debugger
        return adptedData
    }

    render() {
        console.log(this.state.groupTravels)
        console.log(this.props.selectedNation)
        return (
            <TableContainer component={Paper}>
                <Table className={"BOBO"} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell align="left">Durata</TableCell>
                            <TableCell align="left">Servizi</TableCell>
                            <TableCell align="left">Itinerario</TableCell>
                            <TableCell align="left">Cassa Comune</TableCell>
                            <TableCell align="left">Prezzo</TableCell>
                            <TableCell align="left">Link</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.groupTravels.map(row => (
                            <TableRow key={row.tourLink} style={{fontSize: 'small'}}>
                                <TableCell align="left"
                                           style={{width: '7%', fontSize: 'small'}}>{row.travelName}</TableCell>
                                <TableCell align="left" style={{width: '8%'}}>{row.duration}</TableCell>
                                <TableRow>
                                    <TableCell align="left" style={{width: '20%'}}>{this.adaptIncludedServices(
                                        row.services.includedServices)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left">Servizi Non Inclusi</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left" style={{width: '20%'}}>{this.adaptArray(
                                        row.services.notIncludedServices)}</TableCell>
                                </TableRow>
                                <TableCell align="left" style={{width: '13%'}}>{this.adaptArray(
                                    row.itinerary)}
                                </TableCell>
                                <TableRow>
                                    <TableCell align="left"
                                               style={{width: '15%'}}>{row.commonCash.description}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left">Cos'è Incluso Nella Cassa Comune</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left" style={{width: '15%'}}>{this.adaptIncludedServices(
                                        row.commonCash.includedServices)}</TableCell>
                                </TableRow>
                                <TableCell align="left" style={{width: '3%'}}>{row.price}</TableCell>
                                <TableCell align="left" style={{width: '3%'}}><Button variant="contained"
                                                                                      color="primary"
                                                                                      href={row.tourLink}
                                                                                      target="_blank"
                                                                                      rel="noopener noreferrer">Scopri</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

export default GroupTravel
