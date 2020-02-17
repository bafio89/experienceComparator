package com.experience

import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate
import java.sql.ResultSet

interface NationRepository {

    fun findById(nationId: Int): List<Nation>?
    fun findAll(): List<Nation>?

}

class JdbcNationRepository(val jdbcTemplate: NamedParameterJdbcTemplate) : NationRepository {

    override fun findById(nationId: Int): List<Nation>? {
        return jdbcTemplate.query("SELECT * FROM tourscanner.nation where id=${nationId}", mapResultInANation())
    }

    override fun findAll(): List<Nation>? {
        return jdbcTemplate.query("SELECT * FROM tourscanner.nation order by " +
                "name asc", mapResultInANation())
    }


    fun mapResultInANation(): (ResultSet) -> ArrayList<Nation> =
        { rs: ResultSet ->

            var nations: ArrayList<Nation> = ArrayList()
            while (rs.next()) {
                nations.add(Nation(rs.getInt("id"), rs.getString("name")))
            }
            nations

        }
}
