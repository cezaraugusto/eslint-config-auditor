// A config file deliberately outside the tsconfig `include`. It should lint
// via projectService.allowDefaultProject instead of throwing.
const config = {build: true}

export default config
