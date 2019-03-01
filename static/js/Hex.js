class Hex {
    constructor(id, j, i) {
        //#region config
        this.offset = 20
        this.spaces = 5
        //#endregion

        let img = $(`<div class='hexagon' id='hexagon${id}'>`)
        img
            .css("position", "absolute")
            .css("background-image", "url('/static/img/hexagon.png')")
            .css("background-size", "contain")
            .css("left", ((86.25 + this.spaces + 1) * j) + this.offset)
        if (j % 2 == 0) {
            img
                .css("top", ((100 + this.spaces) * i) + this.offset)
        }
        else {
            img
                .css("top", ((100 + this.spaces) * i + 50) + this.offset)
        }

        img.click(function () {
            var id = this.id.substr(7, this.id.length - 2)
            console.log(`hexagon ${id} clicked`);
            console.log(`col: ${j}, row: ${i}`);
            var entry = level.find(hexagon => hexagon.id == id)
            if (entry == undefined) {
                console.log("doesnt exist yet - creating");
                var arrow = $("<img src='/static/img/arrow.png' class='arrow' id='arrow" + id + "'>")
                $("#hexagon" + id).append(arrow)
                var div = $("<div id='displayDiv" + id + "' class='displayDiv'>")
                $("#hexagon" + id).append(div)
                level.push(
                    {
                        id: id,
                        col: j,
                        row: i,
                        dir: 0,
                    }
                )
                entry = level.find(hexagon => hexagon.id == id)
            }
            else {
                console.log("exists - updating");
                if (entry.dir == 5) {
                    entry.dir = 0
                }
                else {
                    entry.dir++
                }
            }
            $("#displayDiv" + id).text(entry.dir)
            img.css("transform", "rotate(" + entry.dir * 60 + "deg)")
        })

        img.appendTo($("#map"))
    }
}