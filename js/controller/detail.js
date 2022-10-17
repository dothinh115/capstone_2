var param = new URLSearchParams(window.location.search);
var id = param.get("id");
var mainImg = document.querySelector(".imgInner");
var productName = document.querySelectorAll(".productDetail h3")[0];
var productDetail = document.querySelector(".productDetail p");
var productSize = document.querySelector(".productDetail ul");
var productPrice = document.querySelectorAll(".productDetail p")[1];
var soLuong = Number(document.querySelector(".productDetail span").innerText);
var dauCong = document.querySelector(".productDetail button");
var dauTru = document.querySelectorAll(".productDetail button")[1];
var feature = document.querySelector(".featureContainer");
var promise = axios({
    url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${id}`,
    method: "GET",
    ResponseType: "JSON"
});
promise.then(res => {
    var size = "";
    var related = "";
    mainImg.innerHTML = `<img src="${res.data.content.image
    }" />`;
    productName.innerText = res.data.content.name;
    productDetail.innerText = res.data.content.description;
    res.data.content.size.forEach(item => {
        size += `
            <li class="sizeItem">${item}</li>
        `;
    });
    productSize.innerHTML = size;
    productPrice.innerText = "$" + res.data.content.price*soLuong;
    console.log(res.data.content);
    res.data.content.relatedProducts.forEach(item => {
        related += `
        <div class="featureItem">
            <div class="itemInner">
                <div class="topImg">
                    <img src="${item.image}" alt="">
                </div>
                <div class="detail">
                    <h3>
                        ${item.name.length > 18 ? item.name.substr(0,18) + "..." : item.name}
                        <span class="tooltiptext">
                            ${item.name}
                        </span>
                    </h3>
                    <p>
                        ${item.description.length > 60 ? item.description.substr(0, 60) + "..." : item.description}
                        <span class="tooltiptext">
                            ${item.description}
                        </span>
                    </p>
                </div>
                <div class="footer">
                    <a href="/detail.html?id=${item.id}">
                        Buy now
                    </a>
                    <span>
                        $${item.price}
                    </span>
                </div>
            </div>
        </div>
        `;
    });
    feature.innerHTML = related;
});
promise.catch(err => {
    console.log(err);
}); 

dauTruFunc = () => {
    if (soLuong === 1) {
        dauTru.style.display = "none";
    }
    else {
        dauTru.style.display = "inline-block";
    }
}
dauTruFunc();

dauCong.addEventListener("click", () => {
    soLuong++;
    document.querySelector(".productDetail span").innerText = soLuong;
    dauTruFunc();
});

dauTru.addEventListener("click", () => {
    soLuong--;
    document.querySelector(".productDetail span").innerText = soLuong;
    dauTruFunc();
});

