let app = new Vue({ 
  el: '#calculator',
  data: {
      area: "0",
      equation: ""
  },
  watch: {
    'area': function (neew, old){
      this.area = neew.replace(/[A-Z]/gi,"")
    }
  },
  methods: {
    clearArea: function() {
      this.area = ""
    }, 
    clearAll: function() {
      this.area = "0"
      this.equation = ""
    },
    keymonitor: function(event) {
      if (this.area.length == 1 && this.area == "0") console.log("Entrou")
      if (event.key == " ") this.area = this.area.replace(/\s/g,"")
      if (event.key == "(" && this.area[this.area.length-2].search(/\d/g)+1 > 0) {
        this.area = this.area.replace(/(\d*)\(\d*?[\-\+]?/g,"$1*(")
      }
      if (this.area[this.area.length-1].search(/\d*/g)+1 > 0 && this.area[this.area.length-2] == ")") {
        this.area = this.area.replace(/\)(\d*)/,")*$1")
      }
      if (event.key == 'Enter') {
        console.log(this.area)
        this.equation = this.area
        let translate = this.area.replace(/\%/g,"/100")
        translate = translate.replace(/(\d*)\^(\d*)/g,`Math.pow($1,$2)`)
        this.evaluate(translate)
      }
    },
    percentage: function(){
      this.area += "%"
    },
    backspace: function(){
      if (this.area.length == 1) {
        this.area = "0"
      }else{
        this.area = this.area.slice(0,this.area.length-1)
      }
    },
    evaluate: function(equation) {
      this.area = String(eval(equation))
    }
  }
})
