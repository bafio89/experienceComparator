package com.experience.config

import com.experience.JdbcNationRepository
import com.experience.JdbcTravelInfoRepository
import com.experience.NationRepository
import com.experience.TravelInfoRepository
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate
import javax.sql.DataSource

@Configuration
class RepositoryConfig{

    @Bean
    fun travelInfoRepository(fiorellaViaggi : DataSource) : TravelInfoRepository = JdbcTravelInfoRepository(
        NamedParameterJdbcTemplate(fiorellaViaggi))

    @Bean
    fun nationRepository(fiorellaViaggi : DataSource) : NationRepository = JdbcNationRepository(
        NamedParameterJdbcTemplate(fiorellaViaggi))

}
