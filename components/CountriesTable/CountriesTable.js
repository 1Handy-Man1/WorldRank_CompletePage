import Link from "next/link";
import { 
    KeyboardArrowDownRounded,
    KeyboardArrowUpRounded
 } from "@mui/icons-material";
import { useState } from "react";
import styles from "./CountriesTable.module.css";

const orderBy = (countries, value, direction) => {
    if(direction === "asc") {
        return [...countries],sort((a, b) => (a[value] > b[value] ? 1 : -1));
    }
    if(direction === "desc") {
        return [...countries],sort((a, b) => (a[value] > b[value] ? -1 : 1));
    }

    return countries;
};

const SortArrow = ({ direction }) => {
    if(!direction) {
        return <></>
    }

    if(direction === "asc") {
        return (
            <div className={styles.heading_arrow}>
                <keyboardArrowDownRounded color="inherit" />
            </div>
        );
    } else {
        return (
            <div className={styles.heading_arrow}>
                <keyboardArrowUpRounded color="inherit" />
            </div>
        );
    }
};

const CountriesTable = ({ countries }) => {
    const [direction, setDirection] = useState();
    const [value, setValue] = useState();

    const switchDirection = () => {
        if(!direction) {
            setDirection("desc");
        } else if (direction === "desc"){
            setDirection("asc")
        } else {
            setDirection(null);
        }
    };

    const setValueAndDirection = (value) => {
        switchDirection();
        setValue();
    }

    const orderedCountries = orderBy(countries, value, direction);
    const giniCheck=({countries}) => {
        countries.map((country) => {
            if(!country.gini){country.gini = {2000:0}}
            let keys = Object.keys(country.gini)
            return country.gini.keys[0]
        })
    }
    return (
        <div className={styles.heading}>
            <div className={styles.heading_flag}></div>

            <button
                className={styles.heading_name}
                onClick={() => setValueAndDirection("name")}
            >
                <div>Name</div>

                {value === "name" && <SortArrow direction={direction} />}
            </button>

            <button
                className={styles.heading_population}
                onClick={() => setValueAndDirection("population")}
            >
                <div>Population</div>

                {value === "population" && <SortArrow direction={direction} />}
            </button>

            <button
                className={styles.heading_population}
                onClick={() => setValueAndDirection("area")}
            >
                <div>
                    Area (km<sup style={{ fontSize: "0.5rem" }}>2</sup>)
                </div>

                {value === "area" && <SortArrow direction={direction} />}
            </button>

            <button
                className={styles.heading_population}
                onClick={() => setValueAndDirection("gini")}
            >
                <div>Gini</div>

                {value === "gini" && <SortArrow direction={direction} />}
            </button>

            {orderedCountries.map((country) => (
                <Link href={`/country/${country.cca3}`} key={country.name.common}>
                    <div className={styles.row}>
                        <div className={styles.flag}>
                            <img src={country.flags.png} alt={country.name.common} />
                        </div>
                        <div className={styles.name}>{country.name.common}</div>

                        <div className={styles.population}>{country.population}</div>

                        <div className={styles.area}>{country.area || 0}</div>

                        <div className={styles.gini}>{country.giniCheck} %</div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default CountriesTable;