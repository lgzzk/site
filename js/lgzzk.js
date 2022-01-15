"use strict";

Z(function () {
        let slide,
        i_slide,
        asynch,
        json,
        imgInfos,
        index_img,
        flg_rotate = 0,
        flg_slide = 0,
        sidebar = Z("#sidebar"),
        content = Z("#content"),
        infobox = Z(".infobox"),
        open = Z("#open_sidebar"),
        close = Z("#close_sidebar"),
        icos = Z("#content_ico span"),
        sidebar_li = Z("#sidebar ul li"),
        content_slide = Z("#content_slide");
    Z.ajax({
        type: "get",
        dataType: "json",
        url: "./lgzzk.json",
        success: function (r) {
            json = r;
            imgInfos = r.BannerImg;
            i_slide = Z.random(0, imgInfos.length - 1);
            createSlide();
            content_slide.css("margin-left", -i_slide * 100 + "%");
            asynch = setInterval(next, 10000);
            setTimeout(() => {
                sidebar.css("background-image", "url(" + json.childhood + ")");
            }, 500);
        }
    })
    open.click(function () {
        open.css({
            "left": "200px",
            "opacity": "0",
        });
        close.css({
            "left": "220px"
        });
        sidebar.css("left", "0px");
        content.css("left", "250px");
    });
    close.click(function () {
        open.css({
            "opacity": "1",
            "left": "60px",
        });
        close.css({
            "left": "150px"
        });
        sidebar.css("left", "-300px");
        content.css("left", "0px");
    });
    icos.eq(0).click(function () {
        var DEG, bottom;
        if (flg_rotate === 0) {
            DEG = 180;
            bottom = 0;
            flg_rotate = 1;
        } else {
            DEG = 0;
            bottom = -35;
            flg_rotate = 0;
        }
        content.css("bottom", 35 * flg_rotate + "px");
        Z("#footer").css("bottom", bottom + "px");
        icos.eq(0).css("transform", "rotate(" + DEG + "deg" + ")");
    });
    icos.eq(1).click(function () {
        if (--i_slide < 0) i_slide = imgInfos.length - 1;
        content_slide.css("margin-left", -i_slide * 100 + "%");
        setTimeout(change_infobox, 350);

    });
    var next = function () {
        i_slide = ++i_slide % imgInfos.length;
        content_slide.css("margin-left", -i_slide * 100 + "%");
        slide.eq(i_slide).css("background-image", "url(" + imgInfos[i_slide].url + ")");
        if (i_slide + 1 !== imgInfos.length) {
            slide.eq(i_slide + 1).css("background-image", "url(" + imgInfos[i_slide + 1].url + ")");
        }
    }
    icos.eq(2).click(next);
    icos.eq(3).click(function () {
        if (flg_slide++ % 2 === 0) {
            Z(this).text("");
            clearInterval(asynch);
        } else {
            Z(this).text("");
            asynch = setInterval(next, 3500);
        }
    });

    function createSlide() {
        Z.each(imgInfos, function (i) {
            let slide = Z("<div>");
            slide.attr("class", "slide");
            slide.html("<span class='infobox'>" + imgInfos[i].info);
            slide.css("background-image", "url(" + imgInfos[i_slide].url + ")");
            content_slide.append(slide);
        })
        slide = Z("#content_slide .slide");
        if (i_slide + 1 !== imgInfos.length) {
            slide.eq(i_slide + 1).css("background-image", "url(" + imgInfos[i_slide + 1].url + ")");
        }
    }

    let start = null,
        textIndex = 0,
        headIndex = 0,
        interval = 80,
        isDeleting = false,
        headText = Z("#headText"),
        head_text = ["LGZZK 大二软技", " JAVA Linux Android", "普通开发者 单身汪🐶", "🧒最近在家摸鱼👍"];

    function typewriting(time) {
        window.requestAnimationFrame(typewriting);
        if (!start) start = time;
        let progress = time - start;
        if (progress > interval + Z.random(0, interval) % interval) {
            start = time;
            if (isDeleting) {
                --textIndex
                let s = [...head_text[headIndex]].slice(0,textIndex).toString()
                headText.text(s.replace(/,/g,""));
            } else {
                ++textIndex
                let s = [...head_text[headIndex]].slice(0,textIndex).toString()
                headText.text(s.replace(/,/g,""));
            }
            if (textIndex === head_text[headIndex].length) {
                start += 4000
                isDeleting = true;
            }
            if (textIndex === 0) {
                start += 1000
                isDeleting = false
                headIndex = ++headIndex % head_text.length
            }
        }
    }

    window.requestAnimationFrame(typewriting)
})
