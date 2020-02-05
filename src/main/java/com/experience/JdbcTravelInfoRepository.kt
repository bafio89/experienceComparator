package com.experience

import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate
import java.net.MalformedURLException
import java.net.URL
import java.sql.ResultSet
import java.util.*

interface TravelInfoRepository{

    fun findByNation(nationId: Int) : ArrayList<TravelInfo>?

}

class JdbcTravelInfoRepository(val jdbcTemplate : NamedParameterJdbcTemplate) : TravelInfoRepository {

    override fun findByNation(nationId: Int) : ArrayList<TravelInfo>? = jdbcTemplate.query("SELECT * FROM tourscanner.tour where nation_id=${nationId}" , mapResultInATour())



    private fun mapResultInATour(): (ResultSet) -> ArrayList<TravelInfo> {
        return { rs: ResultSet ->

            val travelInfoList = ArrayList<TravelInfo>()

            while (rs.next()) {
                var linkToTour: URL? = null
                try {
                    linkToTour = URL(rs.getString("LINK_TO_TOUR"))
                } catch (e: MalformedURLException) {
                    e.printStackTrace()
                }

                travelInfoList.add(
                    TravelInfo(
                        rs.getString("NATION_ID"),
                        rs.getString("TITLE"),
                        rs.getString("DURATION"),
                        Services(
                            rs.getString("INCLUDED_SERVICES").split("\n "),
                            rs.getString("NOT_INCLUDED_SERVICES").split("\n")
                        ),
                        rs.getString("PRICE"),
                        rs.getString("ITINERARY").split("\n"),
                        CommonCash(rs.getString("COMMON_CASH_DESCRIPTION"),
                            rs.getString("COMMON_CASH_INCLUDED_SERVICES").split("\n ")
                        ),
                        Integer.parseInt(rs.getString("COMPANY_ID")),
                        linkToTour
                    )
                )
            }
            travelInfoList
        }
    }

}
