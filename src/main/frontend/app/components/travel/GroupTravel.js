import React from "react";
import {PageStatus} from "../util/pageStatus";

import {makeStyles} from "@material-ui/core/styles";
import {red} from "@material-ui/core/colors";
import TravelCardMobile from "./TravelCardMobile";
import TravelCard from "./TravelCard";

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
            images: []
        }
    }

    componentDidUpdate(prevProps, prevState, bo) {

        if (prevProps !== this.props && this.props.selectedNation != null) {
            this.fecthTravelGroup();
            this.fetchImages()
        }
    }

    adaptIncludedServices(data) {

        let adptedData = [];
        let splittedData = data[0].split("\n");
        splittedData.forEach(it => (it !== "" ? adptedData.push(<li>{it}</li>) : it));
        return adptedData
    }

    adaptIncludedServicesWithPrefix(data) {

        let adptedData = [];
        if (data[0] !== "") {
            adptedData.push("La cassa comune include: ")
        }
        let splittedData = data[0].split("\n");
        splittedData.forEach(it => (it !== "" ? adptedData.push(<li>{it}</li>) : it));
        return adptedData
    }

    adaptArray(data) {

        let adptedData = []
        data.forEach(it => (adptedData.push(<li>{it}</li>)));
        return adptedData
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

    fetchImages() {
        fetch("https://pixabay.com/api/?key=15682148-b1e9b4ecfe0388878dc67757d&q=" + this.props.selectedNation.title)
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        this.setState({
                            images: data.hits,
                        });
                    }.bind(this))
                }
            }.bind(this))
    }

    render() {

        if (window.matchMedia("all and (max-width: 667px)").matches) {
            console.log("piccolo schermo")

            return (this.state.groupTravels.map(row => (<TravelCardMobile nation={row}/>)));
        }
        else {
            return (
                this.state.groupTravels.map(row => (<TravelCard nation={row}/>))
            );
        }
    }
}

export default GroupTravel
