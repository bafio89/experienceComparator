package com.experience.rest

import com.experience.Nation
import com.experience.NationRepository
import com.experience.TravelInfo
import com.experience.TravelInfoRepository
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.ArrayList

@RestController()
@RequestMapping("/grouptravel")
class TravelEndPoint(val travelInfoRepository: TravelInfoRepository,
                     val nationRepository: NationRepository) {

    @GetMapping("/{nationId}")
    fun groupTravelByNation(@PathVariable nationId : Int): ArrayList<TravelInfo>? = travelInfoRepository.findByNation(nationId)

    @GetMapping("/nation/{nationId}")
    fun groupTravelNationBy(@PathVariable nationId : Int): List<Nation>? = nationRepository.findById(nationId)

    @GetMapping("/nations")
    fun groupTravelNations(): List<Nation>? = nationRepository.findAll()
}
