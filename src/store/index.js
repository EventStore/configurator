import {SubmitCodeBlock, UpdateConnectionString} from "./mutations";

const state = {
    connectionString: "",
    codeBlocks: {}
};

const mutations = {
    [UpdateConnectionString](state, conn) {
        state.connectionString = conn;
    },
    [SubmitCodeBlock](state, block) {
        state.codeBlocks = {...state.codeBlocks, [block.key]: block.value};
    }
};

const getters = {
};

export default {
    state,
    mutations,
    getters
};
