@description('Cosmos DB account name')
param cosmosAccountName string

@description('Region for Cosmos DB account')
param primaryRegion string

@description('Cosmos DB database name')
param cosmosDatabaseName string

module cosmosdb './modules/cosmos-nosql.bicep' = {
  name: 'cosmosdb'
  params: {
    cosmosAccountName: cosmosAccountName
    cosmosDatabaseName: cosmosDatabaseName
    primaryRegion: primaryRegion
  }
}
