var feature = document.querySelector(".featureContainer");
var promise = axios({
    url : "https://shop.cyberlearn.vn/api/Product",
    method: "GET",
    ResponseType: "JSON"
});
promise.then(function(res){
    var products = "";
    res.data.content.forEach(function(item) {
        products += `<div class="featureItem">
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
        </div>`;
    });
    feature.innerHTML = products;
});
promise.catch(function(err){
    console.log(err);
});