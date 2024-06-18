import axios from 'axios'
import EventEmitter from 'events'

const a = {
"success": true,
  "items": [
    {
      "name": "Sealed Graffiti | Recoil AUG (Jungle Green)",
      "count": 6,
      "min": 2100,
      "steam_price": 4390,
      "img": "https://images.waxpeer.com/i/730-sealed-graffiti-recoil-aug-jungle-green.webp",
      "type": "Graffiti",
      "rarity_color": "#B0C3D9"
    }
  ]
}

const providerMap = new Map<string, Map<string, number>>()

interface ItemProvider {
  getSoldItems: () => Promise<void>
}

interface IWaxpeerItem {
  name: string
   count: number
   min: number
   steam_price: number
   img: string
   type: string
   rarity_color: string
}



class WaxpeerProvider implements ItemProvider {
  protected readonly url = 'https://api.waxpeer.com/v1/prices/?game=csgo'
  public readonly eventPrefix = 'waxpeer'
  private countItems = new Map<string, number>()
  private events: EventEmitter;

  constructor(events: EventEmitter) {
    this.events = events
  }

  async getSoldItems(): Promise<void> {
    console.log('UPDATE')
    try {
      const { data } = await axios.get(this.url)
      const items = data.items
      if (!this.countItems.size){
        items.forEach((x: IWaxpeerItem) => {
          this.countItems.set(x.name, x.count)
        })
        console.log('ADD ITEMS')
      } else {
        const newItems = new Map<string, number>()
        items.forEach((x: IWaxpeerItem) => {
          newItems.set(x.name, x.count)
        })
        this.countItems.forEach((count, name) => {
          if (!newItems.has(name)) {
            this.countItems.delete(name)
            this.events.emit(this.eventPrefix + '_sold', name)
          }
        })
        newItems.forEach((count, name) => {
          if (!this.countItems.has(name)) {
            this.countItems.set(name, count)
          } else {
            const prevCount = this.countItems.get(name) as number
            if (prevCount !== undefined && prevCount !== count) {
              if (prevCount > count) {
                this.events.emit(this.eventPrefix + '_sold', name)
              }
            }
            this.countItems.set(name, count)
          }
        })
      }
    } catch (err) {
      console.error('Cannot get items from WaxpeerProvider');
      throw err
    }
  }
}

const main = async () => {
  const events = new EventEmitter()
  events.on('waxpeer_sold', (item) => {
    console.log('Sold item: ', item)
  })
  const waxpeerProvider = new WaxpeerProvider(events)

  setInterval(async () => {
    await waxpeerProvider.getSoldItems();
  }, 5000)

  


}

main()