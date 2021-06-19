import Layout from "../hoc/Layout";
import Strategic from "../components/home/Strategic";
import Hero from "../components/home/Hero";
import CoreValues from "../components/home/CoreValues";
import Roles from "../components/home/Roles";
import HomepageLayout from "../hoc/HomepageLayout";
import ServiceBief from "../components/home/ServiceBief";
import FeaturedNews from "../components/home/FeaturedNews";


export default function Home() {
    return (
        <HomepageLayout>
            <ServiceBief/>
            <Strategic/>
            <CoreValues/>
            <Roles/>
        </HomepageLayout>
    )
}
