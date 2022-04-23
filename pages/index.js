import Head from 'next/head'
import { useState } from "react";
import Countries from "../components/CountriesTable/CountriesTable";
import Layout from "../components/Layout/Layout";
import SearchInput from "../components/SearchInput/SearchInput";
import styles from '../styles/Home.module.css'

export default function Home() {
  const [keyword, setKeyWord] = useState("");
  // console.log(countries)
  var filteredCountries = countries.filter(country => {
    let commonName = country.name.common
    if(commonName.toLowerCase().includes(keyword)) return country
    if(country.region.toLowerCase().includes(keyword)) return country
    if(country.subregion.toLowerCase().includes(keyword)) return country
  })


  const onInputChange = (e) => {
    e.preventDefault();
    setKeyWord(e.target.value.toLowerCase(), e.target.value.toUpperCase());
  };

  return (
    <Layout>
      <div className={styles.inputContainer}>
        <div className={styles.counts}>Found {countries.length} countries</div>

        <div className={styles.input}>
          <SearchInput
            placeholder="Filter by name, Region or SubRegion"
            onChange={onInputChange}
          />
        </div>
      </div>

      <Countries countries={countries} />
    </Layout>
  )
}

export const getServerSideProps = () => {
  const res = await fetch("https://restcountris.com/v3.1/call");
  const countries = await res.json()
  if(!countries.length){console.log("Not Working")}
  return {
    props: {
      countries,
    },
  };
};
