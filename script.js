function setViewImage() {
  setTimeout(() => {
    document.getElementById('image_bg').classList.add('no-opacity')
  },
    500
  )
}

function nextAutoImage() {
  setInterval(() => {
    const items = document.querySelectorAll("#items-select .item-list")
    if (items && items.length > 0) {
      const firstSlide = items[0].querySelector("a img")
      const loader = document.getElementById("carousel-loading")

      if (loader && firstSlide.src) {
        loader.id = "";
        const newImage = loader
        newImage.src = firstSlide.src
      }
      document.getElementById('items-select').appendChild(items[0])
    }

  },
    2000)
}

function itemsToInsert(elementId, items = []) {
  const container = document.getElementById(elementId)
  if (container) {
    const itemsContainer = container.querySelector('.content-list')
    if (itemsContainer) {
      for (const item of items) {
        itemsContainer.innerHTML += `
      <div class="item-list">
        <div class="content-item-list" style="--color: ${item.color}">
          <img src="./imgs/${item.image}" class="image" alt="image">
        </div>
        <div class="view-content">
          <div class="sub-content">
          <h2 class="title" style="--color: ${item.color}">${item.title}</h2>
          <h4 class="sub-title">Some text</h4>
            <div class="text">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Dolor eaque quas, enim aliquam natus sint laboriosam unde cum,
                porro nemo rerum a laudantium voluptatum repudiandae veniam possimus similique ad ea?
              </p>
            </div>
            <div class="links">
              <div class="item-link">
                <a href="javascript:void(0)" class="link" style="--color:${item.color}">
                  Link Text
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      `
      }
    }
  }
}

function carousel(items_list) {
  const first_item = items_list.querySelector('.item-list')
  const second_item = items_list.querySelector('.item-list:nth-of-type(2)')
  const setViewer = document.getElementById('set-img');
  const viewContent = setViewer.querySelector('.view-content')
  const newImageView = second_item.querySelector('.content-item-list>img').cloneNode(true)

  viewContent.innerHTML = second_item.querySelector('.view-content').innerHTML
  setViewer.insertBefore(newImageView, viewContent)
  items_list.appendChild(first_item)

  while (setViewer.children.length > 3) {
    setViewer.removeChild(setViewer.firstChild)
  }
}

async function play(containerId, items) {
  itemsToInsert(containerId, items);

  const containerList = document.getElementById(containerId).querySelector('.content-list')

  if (containerList.children.length >= 2)
    setInterval(() => carousel(containerList), 2500);
}

const items_list = [
  { image: "html.png", title: "HTML", color: '#F16529' },
  { image: "node.png", title: "Node.Js", color: '#8CC84B'},
  { image: "next.png", title: "Next.Js", color: '#FFFFFF' },
];

window.onload = () => {
  play('carousel-list-items', items_list);
}