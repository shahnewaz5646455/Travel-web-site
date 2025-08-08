import React from 'react'
import Banner from './Banner'
import OurPakage from './OurPakage'
import OverviewSection from './OverviewSection'
import LottieFeatureSection from './new'
import WhyChooseUs from './feature'
import TouristStorySection from './TouristStorySection'

export default function Home() {
  return (
    <div>
      <section>
        <Banner></Banner>
      </section>
      <section>
        <OverviewSection></OverviewSection>
      </section>
      <section className=''>
        <OurPakage></OurPakage>
      </section>
      <section className=''>
        <TouristStorySection></TouristStorySection>
      </section>
      <section>
        <LottieFeatureSection></LottieFeatureSection>
      </section>
      <section>
        <WhyChooseUs></WhyChooseUs>
      </section>

    </div>
  )
}
