import React, {useState} from 'react';
import SideNavBar from "./Components/SideNavBar";
import Results from "./Components/Results";
import TopBar from "./Components/TopBar";
import './assets/css/App.css';

const App = () => {
    const [results, setResults] = useState([]);
    const [title, setTitle] = useState('');
    const [sideBarWidth, setSideBarWidth] = useState('0%');
    const [showSideBarButton, setShowSideBarButton] = useState(true);
    const [formInSideBar, setFormInSideBar] = useState('true');

    const getPlaceClick = () => {
        fetch('/api/get-database').then(res => res.json()).then((result) => {
            const allPlaces = [];
            console.log(result)
            result.places.forEach(place => {
                allPlaces.push(place);
            });
            setTitle(`All Places in DB`)
            setResults(allPlaces);
        }, (err) => {
            console.log(err)
        })
    };
    const receivedChildValue = (items, searchWord) => {
        if(items.length === 0){
            setTitle(`No places were found matching: ${searchWord}`)
        } else {
            setTitle(`Search Results for: ${searchWord}`)
        }
        setResults(items);
    };
    const openSidenav = (formToOpen) => {
        setFormInSideBar(formToOpen);
        console.log(formToOpen)
        setSideBarWidth('min-content');
        setShowSideBarButton(false);
    }
    const closeSidenav = () => {
        setSideBarWidth('0%');
        setShowSideBarButton(true);
    }

    return (
        <div className="App">
            <TopBar
                onAddPlaceClick={openSidenav}
                showSideBarButton={showSideBarButton}
                onGetPlacesClick={getPlaceClick}
                fromChildToParentCallback={receivedChildValue}
            />
            <SideNavBar
                width={sideBarWidth}
                closeNav={closeSidenav}
                formToOpen={formInSideBar}
                fromChildToParentCallback={receivedChildValue}/>
            <Results data={results} title={title}/>
        </div>
    );
}

export default App;
