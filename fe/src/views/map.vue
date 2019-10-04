<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>GPS기반 3보고 체계</v-card-title>
          <v-row justify="center" style="height:80px">
              <v-text-field
                v-model="keyWord"
                label="현재위치를 검색해주세요"
                outlined
                dense
                solo
                clearable
                class="ma-3"
              ></v-text-field>
              <v-btn x-large class="ma-3" @click="searchPlace">검색</v-btn>
          </v-row>
        </v-card>
      </v-flex>
    </v-layout>
    <vue-daum-map
      :appKey="mapInfo.appKey"
      :center.sync="mapInfo.center"
      :level.sync="mapInfo.level"
      :mapTypeId="mapInfo.mapTypeId"
      :libraries="mapInfo.libraries"
      @load="onLoad"
      @center_changed=""
      @zoom_start=""
      @zoom_changed=""
      @bounds_changed=""
      @click="moveMarker"
      @dblclick=""
      @rightclick=""
      @mousemove=""
      @dragstart=""
      @drag=""
      @dragend=""
      @idle=""
      @tilesloaded=""
      @maptypeid_changed=""
      style="width:100%;height:500px"/>
  </v-container>
</template>
<script>
import VueDaumMap from 'vue-daum-map'
export default {
  components: { VueDaumMap },
  data () {
    return {
      mapInfo: {
        appKey: '137a302f821492cf862c84dd692e887e', // 테스트용 appkey
        center: { lat: 37.566826, lng: 126.9786567 }, // 지도의 중심 좌표
        level: 3, // 지도의 레벨(확대, 축소 정도),
        mapTypeId: VueDaumMap.MapTypeId.NORMAL, // 맵 타입
        libraries: ['services'] // 추가로 불러올 라이브러리
      },
      map: null, // 지도 객체. 지도가 로드되면 할당됨.
      marker: null, // 마커 객체, marker 메소드 실행시 할당됨
      markers: [],
      latLng: this.center, // 현재 마커가 가리키는 위도경도 정보
      ps: null,
      infowindow: null,
      keyWord: null
    }
  },
  methods: {
    // 지도가 로드 완료되면 load 이벤트 발생
    onLoad (map) {
      this.map = map
      this.createMarker()
      this.infowindow = new kakao.maps.InfoWindow({zIndex: 1})
      this.ps = new kakao.maps.services.Places()
    },
    createMarker () {
      var imageSrc = 'http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png'
      var imageSize = new kakao.maps.Size(40, 45)
      // var imageOption =  imageOption = {offset: new kakao.maps.Point(27, 69)}
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize)
      this.marker = new kakao.maps.Marker({
        position: this.map.getCenter(),
        image: markerImage
      })
      this.marker.setMap(this.map)
    },
    moveMarker (mouseEvent) {
      this.latLng = mouseEvent[0].latLng
      this.marker.setPosition(this.latLng)
      console.log(JSON.stringify(this.latLng))
    },
    searchPlace () {
      this.ps.keywordSearch(this.keyWord, this.placesSearchCB); 
    },
    placesSearchCB (data, status, pagination) {
      if (status === kakao.maps.services.Status.OK){
        var bounds = new kakao.maps.LatLngBounds()
        for (var i=0; i<data.length; i++) {
          this.displayMarker(data[i])
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
        }
        this.map.setBounds(bounds)
      }
    },
    displayMarker(place) {
      var marker = new kakao.maps.Marker({
        map: this.map,
        clickable: true,
        position: new kakao.maps.LatLng(place.y, place.x)
      })
      this.infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>')
      this.infowindow.open(this.map, marker)
    }
  }
}
</script>
