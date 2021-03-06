import createId from '@/lib/createId'
import addDataSource from "@/lib/addDataSource";
import dayjs from 'dayjs'
import clone from '@/lib/clone';

const state = {
    addDate: { currentKind: { iconName: undefined, textName: undefined }, type: "-", notes: "", number: '', createdAt: undefined } as addDate,
    addToggle: false,
    adToggle: true,
    currentTime: dayjs().format('YYYY-MM-DD'),
    DateList: [] as RecordItem[],
    spendKinds: [] as string[],
    incomeKinds: [] as string[]
}
const getters = {
    DateList() {
        const month = dayjs(state.currentTime).format('MM')
        const items = {} as any;
        const list = clone(state.DateList).filter(item => dayjs(item.data.createdAt).format('MM') === month).sort(
            (b: RecordItem, a: RecordItem) =>
                dayjs(a.data.createdAt).valueOf() - dayjs(b.data.createdAt).valueOf()
        ) as RecordItem[];
        list.forEach(element => {
            const string = element.data.createdAt!.split(" ")[0]
            if (items[string]) {
                items[string.split(" ")[0]].push(element)
            } else {
                (items[string.split(" ")[0]] = [element]);
            }
        });
        return items;
    },
    getListByType() {
        return state.DateList.filter(
            item => item.data.type === state.addDate.type
        );
    },
    monthSpend() {
        const month = dayjs(state.currentTime).format('MM')
        const spendList = clone(state.DateList).filter(item => item.data.type === '-' && dayjs(item.data.createdAt).format('MM') === month).map(item => item.data.number).reduce((sum, item) => sum + parseFloat(item), 0)
        const incomeList = clone(state.DateList).filter(item => item.data.type === '+' && dayjs(item.data.createdAt).format('MM') === month).map(item => item.data.number).reduce((sum, item) => sum + parseFloat(item), 0)
        return { spendList, incomeList }
    },
    // getType() {
    //     return state.addDate.type;
    // },
    currentKinds() {
        if (state.addDate.type === '-') {
            return state.spendKinds
        } else {
            return state.incomeKinds
        }
    }
}
const mutations = {
    fetchData(state: any) {
        state.DateList = JSON.parse(window.localStorage.getItem('dataSource') || '[]')
    },
    fetchKindList(state: any) {
        state.spendKinds = JSON.parse(window.localStorage.getItem('spend') || JSON.stringify(addDataSource.expense));
        state.incomeKinds = JSON.parse(window.localStorage.getItem('income') || JSON.stringify(addDataSource.income));

    },
    saveKindList(state: any, newList: string[]) {
        if (state.addDate.type === '-') {
            window.localStorage.setItem('spend', JSON.stringify(newList))
        } else {
            window.localStorage.setItem('income', JSON.stringify(newList));
        }

    },
    saveData(state: any) {
        const id = createId()
        const data = JSON.parse(JSON.stringify({ id, data: state.addDate }))
        state.DateList.push(data)
        window.localStorage.setItem('dataSource', JSON.stringify(state.DateList))
    },
    changeDateList(state: any, data: RecordItem[]) {
        window.localStorage.setItem('dataSource', JSON.stringify(data))
    },
    changeAddToggle(state: any) {
        state.addToggle = !state.addToggle;
    },
    changeCurrentKind(state: any, currentKind: currentKind) {
        state.addDate.currentKind = currentKind;
    },
    changeType(state: any, type: string) {
        state.addDate.type = type;
    },
    changeNotes(state: any, notes: string) {
        state.addDate.notes = notes
    },
    changeNumber(state: any, number: string) {
        state.addDate.number = number
        state.addDate.createdAt = dayjs().format('YYYY-MM-DD HH:mm:ss')
    },
    currentTime(state: any, date: string) {
        state.currentTime = date
    },
    changeAdToggle(state: any) {
        setTimeout(() => {
            state.adToggle = false

        }, 3000)
    },

}

export default {
    state,
    getters,
    mutations
}